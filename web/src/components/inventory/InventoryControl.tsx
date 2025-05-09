import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>
      <UsefulControls infoVisible={infoVisible} setInfoVisible={setInfoVisible} />
      <div className="inventory-control">
        <div className="inventory-control-header-bar">
          <div className="inventory-control-header-accent"></div>
          <span className="inventory-control-header-text">INVENTORY</span>
        </div>

        <div className="inventory-control-wrapper">
          <div className="inventory-control-section">
            <div className="inventory-control-quantity-label">
              <span className="inventory-control-label-text">QUANTITY</span>
              <div className="inventory-control-label-line"></div>
            </div>

            <div className="inventory-control-input-wrapper">
              <input
                className="inventory-control-input"
                type="number"
                defaultValue={itemAmount}
                onChange={inputHandler}
                min={0}
              />
              <div className="inventory-control-input-corner tl"></div>
              <div className="inventory-control-input-corner tr"></div>
              <div className="inventory-control-input-corner bl"></div>
              <div className="inventory-control-input-corner br"></div>
            </div>
          </div>

          <div className="inventory-control-buttons">
            <button className="inventory-control-button use-button" ref={use}>
              <div className="button-icon use-icon"></div>
              <span>{Locale.ui_use || 'USE'}</span>
              <div className="button-corner-accent"></div>
            </button>

            <button className="inventory-control-button give-button" ref={give}>
              <div className="button-icon give-icon"></div>
              <span>{Locale.ui_give || 'GIVE'}</span>
              <div className="button-corner-accent"></div>
            </button>

            <button
              className="inventory-control-button close-button"
              onClick={() => fetchNui('exit')}
            >
              <div className="button-icon close-icon"></div>
              <span>{Locale.ui_close || 'CLOSE'}</span>
              <div className="button-corner-accent"></div>
            </button>
          </div>
        </div>

        <div className="inventory-control-footer">
          <div className="inventory-control-footer-accent"></div>
        </div>
      </div>

      <button
        className="useful-controls-button"
        onClick={() => setInfoVisible(true)}
        aria-label="Show controls information"
      >
        <div className="controls-button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 524 524">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        </div>
        <div className="controls-button-corner tl"></div>
        <div className="controls-button-corner tr"></div>
        <div className="controls-button-corner bl"></div>
        <div className="controls-button-corner br"></div>
      </button>
    </>
  );
};

export default InventoryControl;
