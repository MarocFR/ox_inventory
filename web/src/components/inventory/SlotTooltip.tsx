import { Inventory, SlotWithItem } from '../../typings';
import React, { Fragment, useMemo } from 'react';
import { Items } from '../../store/items';
import { Locale } from '../../store/locale';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../store';
import ClockIcon from '../utils/icons/ClockIcon';
import { getItemUrl } from '../../helpers';
import Divider from '../utils/Divider';

// Define rarity colors for tooltip headers
const rarityColors = {
  common: '#b1b1b1',
  uncommon: '#3bca5d',
  rare: '#2aaded',
  epic: '#c359ff',
  legendary: '#ffa029',
  mythic: '#ff7018'
};

// Helper to determine item rarity
const getItemRarity = (item: SlotWithItem) => {
  // If item has a specific rarity in metadata, use that
  if (item.rarity) {
    return item.rarity.toLowerCase();
  }

  // Default to common
  return 'common';
};

const SlotTooltip: React.ForwardRefRenderFunction<
  HTMLDivElement,
  { item: SlotWithItem; inventoryType: Inventory['type']; style: React.CSSProperties }
> = ({ item, inventoryType, style }, ref) => {
  const additionalMetadata = useAppSelector((state) => state.inventory.additionalMetadata);
  const itemData = useMemo(() => Items[item.name], [item]);
  const ingredients = useMemo(() => {
    if (!item.ingredients) return null;
    return Object.entries(item.ingredients).sort((a, b) => a[1] - b[1]);
  }, [item]);
  const description = item.metadata?.description || itemData?.description;
  const ammoName = itemData?.ammoName && Items[itemData?.ammoName]?.label;

  // Determine rarity for styling
  const rarity = useMemo(() => getItemRarity(item), [item]);
  const rarityColor = rarityColors[rarity as keyof typeof rarityColors] || rarityColors.common;

  // Format stat bars for Fortnite-style stats
  const renderStatBar = (value: number, maxValue: number = 100, label: string) => {
    const percent = (value / maxValue) * 100;
    return (
      <div className="tooltip-stat">
        <div className="tooltip-stat-label">{label}</div>
        <div className="tooltip-stat-bar">
          <div
            className="tooltip-stat-fill"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(90deg, ${rarityColor}, ${rarityColor}88)`
            }}
          />
        </div>
        <div className="tooltip-stat-value">{value}</div>
      </div>
    );
  };

  return (
    <>
      {!itemData ? (
        <div className="tooltip-wrapper" ref={ref} style={style}>
          <div className="tooltip-header-wrapper">
            <p>{item.name}</p>
          </div>
          <Divider />
        </div>
      ) : (
        <div style={{ ...style }} className={`tooltip-wrapper tooltip-${rarity}`} ref={ref}>
          <div
            className="tooltip-header-wrapper"
            style={{ borderBottom: `2px solid ${rarityColor}` }}
          >
            <p style={{ color: rarityColor }}>{item.metadata?.label || itemData.label || item.name}</p>
            {inventoryType === 'crafting' ? (
              <div className="tooltip-crafting-duration">
                <ClockIcon />
                <p>{(item.duration !== undefined ? item.duration : 3000) / 1000}s</p>
              </div>
            ) : (
              <p>{item.metadata?.type}</p>
            )}
          </div>

          {/* Item rarity badge */}
          <div className="tooltip-rarity-badge" style={{ background: rarityColor }}>
            {rarity.toUpperCase()}
          </div>

          {description && (
            <div className="tooltip-description">
              <ReactMarkdown className="tooltip-markdown">{description}</ReactMarkdown>
            </div>
          )}

          {inventoryType !== 'crafting' ? (
            <>
              {/* Stats section with visual bars */}
              {
                (item.durability !== undefined || item.metadata?.damage || item.metadata?.range || item.metadata?.fire_rate || item.metadata?.accuracy) &&
                (<div className="tooltip-stats-section">
                  {item.durability !== undefined && renderStatBar(Math.trunc(item.durability), 100, Locale.ui_durability)}
                  {item.metadata?.damage && renderStatBar(item.metadata.damage, 100, "Damage")}
                  {item.metadata?.range && renderStatBar(item.metadata.range, 100, "Range")}
                  {item.metadata?.fire_rate && renderStatBar(item.metadata.fire_rate, 100, "Fire Rate")}
                  {item.metadata?.accuracy && renderStatBar(item.metadata.accuracy, 100, "Accuracy")}
                </div>)
              }
              {/* Properties section */}
              {
                ((item.metadata && Object.keys(item.metadata).length > 0) || ammoName) &&
                (<div className="tooltip-properties">
                  {/* Metadata properties */}
                  {item.metadata?.ammo !== undefined && (
                    <div className="tooltip-property">
                      <span className="tooltip-property-label">{Locale.ui_ammo}:</span>
                      <span className="tooltip-property-value">{item.metadata.ammo}</span>
                    </div>
                  )}
                  {ammoName && (
                    <div className="tooltip-property">
                      <span className="tooltip-property-label">{Locale.ammo_type}:</span>
                      <span className="tooltip-property-value">{ammoName}</span>
                    </div>
                  )}
                  {item.metadata?.serial && (
                    <div className="tooltip-property">
                      <span className="tooltip-property-label">{Locale.ui_serial}:</span>
                      <span className="tooltip-property-value">{item.metadata.serial}</span>
                    </div>
                  )}
                  {item.metadata?.components && item.metadata?.components[0] && (
                    <div className="tooltip-property">
                      <span className="tooltip-property-label">{Locale.ui_components}:</span>
                      <span className="tooltip-property-value">
                        {(item.metadata?.components).map((component: string, index: number, array: []) =>
                          index + 1 === array.length ? Items[component]?.label : Items[component]?.label + ', '
                        )}
                      </span>
                    </div>
                  )}
                  {item.metadata?.weapontint && (
                    <div className="tooltip-property">
                      <span className="tooltip-property-label">{Locale.ui_tint}:</span>
                      <span className="tooltip-property-value">{item.metadata.weapontint}</span>
                    </div>
                  )}
                  {additionalMetadata.map((data: { metadata: string; value: string }, index: number) => (
                    <Fragment key={`metadata-${index}`}>
                      {item.metadata && item.metadata[data.metadata] && (
                        <div className="tooltip-property">
                          <span className="tooltip-property-label">{data.value}:</span>
                          <span className="tooltip-property-value">{item.metadata[data.metadata]}</span>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>)
              }
            </>
          ) : (
            <div className="tooltip-ingredients">
              <div className="tooltip-section-title">REQUIRED MATERIALS</div>
              {ingredients &&
                ingredients.map((ingredient) => {
                  const [item, count] = [ingredient[0], ingredient[1]];
                  return (
                    <div className="tooltip-ingredient" key={`ingredient-${item}`}>
                      <img src={item ? getItemUrl(item) : 'none'} alt="item-image" />
                      <p>
                        {count >= 1
                          ? `${count}x ${Items[item]?.label || item}`
                          : count === 0
                          ? `${Items[item]?.label || item}`
                          : count < 1 && `${count * 100}% ${Items[item]?.label || item}`}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default React.forwardRef(SlotTooltip);
