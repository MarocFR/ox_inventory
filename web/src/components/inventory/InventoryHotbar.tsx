import React, { useState, useEffect } from 'react';
import { getItemUrl, isSlotWithItem } from '../../helpers';
import useNuiEvent from '../../hooks/useNuiEvent';
import { Items } from '../../store/items';
import WeightBar from '../utils/WeightBar';
import { useAppSelector } from '../../store';
import { selectLeftInventory } from '../../store/inventory';
import { SlotWithItem } from '../../typings';
import SlideUp from '../utils/transitions/SlideUp';

// Helper function to determine rarity class - same as in InventorySlot
const getRarityClass = (item: SlotWithItem): string => {
  if (item.rarity) {
    return `rarity-${item.rarity.toLowerCase()}`;
  }

  return 'rarity-common';
};

const InventoryHotbar: React.FC = () => {
  const [hotbarVisible, setHotbarVisible] = useState(false);
  const items = useAppSelector(selectLeftInventory).items.slice(0, 5);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  // Style for the animated selection indicator
  const getSelectionIndicator = (slot: number) => {
    return {
      opacity: selectedSlot === slot ? 1 : 0,
      transition: 'opacity 0.3s ease',
    };
  };

  // Animation for slot selection
  useEffect(() => {
    if (hotbarVisible && selectedSlot === null) {
      // Auto-select first slot with an item when hotbar appears
      const firstItemSlot = items.find(item => isSlotWithItem(item))?.slot;
      if (firstItemSlot !== undefined) {
        setSelectedSlot(firstItemSlot);
      }
    }
  }, [hotbarVisible, items, selectedSlot]);

  //stupid fix for timeout
  const [handle, setHandle] = useState<NodeJS.Timeout>();

  useNuiEvent('toggleHotbar', () => {
    if (hotbarVisible) {
      setHotbarVisible(false);
      setSelectedSlot(null);
    } else {
      if (handle) clearTimeout(handle);
      setHotbarVisible(true);
      setHandle(setTimeout(() => {
        setHotbarVisible(false);
        setSelectedSlot(null);
      }, 3000));
    }
  });

  // Allow numeric key navigation (just the visual effect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hotbarVisible) return;

      const key = parseInt(e.key);
      if (!isNaN(key) && key >= 1 && key <= 5) {
        setSelectedSlot(key);

        // Reset the timeout to keep the hotbar open while interacting
        if (handle) clearTimeout(handle);
        setHandle(setTimeout(() => {
          setHotbarVisible(false);
          setSelectedSlot(null);
        }, 3000));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hotbarVisible, handle]);

  return (
    <SlideUp in={hotbarVisible}>
      <div className="hotbar-container">
        {items.map((item) => {
          const rarityClass = isSlotWithItem(item) ? getRarityClass(item as SlotWithItem) : '';

          return (
            <div className="hotbar-slot-wrapper" key={`hotbar-${item.slot}`}>
              {/* Selection indicator (top triangle) */}
              <div
                className="hotbar-selection-indicator"
                style={getSelectionIndicator(item.slot)}
              />

              <div
                className={`hotbar-item-slot ${rarityClass}`}
                style={{
                  backgroundImage: `url(${item?.name ? getItemUrl(item as SlotWithItem) : 'none'}`,
                }}
                onClick={() => setSelectedSlot(item.slot)}
              >
                {isSlotWithItem(item) && (
                  <div className="item-slot-wrapper">
                    <div className="hotbar-slot-header-wrapper">
                      <div className="inventory-slot-number">{item.slot}</div>
                      <div className="item-slot-info-wrapper">
                        <p>
                          {item.weight > 0
                            ? item.weight >= 1000
                              ? `${(item.weight / 1000).toLocaleString('en-us', {
                                  minimumFractionDigits: 2,
                                })}kg `
                              : `${item.weight.toLocaleString('en-us', {
                                  minimumFractionDigits: 0,
                                })}g `
                            : ''}
                        </p>
                        <p>{item.count ? item.count.toLocaleString('en-us') + `x` : ''}</p>
                      </div>
                    </div>
                    <div>
                      {item?.durability !== undefined && <WeightBar percent={item.durability} durability />}
                      <div className="inventory-slot-label-box">
                        <div className="inventory-slot-label-text">
                          {item.metadata?.label ? item.metadata.label : Items[item.name]?.label || item.name}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Slot key indicator (bottom) */}
              <div className="hotbar-key-indicator">
                <span>{item.slot}</span>
              </div>
            </div>
          );
        })}
      </div>
    </SlideUp>
  );
};

export default InventoryHotbar;
