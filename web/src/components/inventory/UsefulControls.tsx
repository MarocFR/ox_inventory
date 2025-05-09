import { Locale } from '../../store/locale';
import React from 'react';

interface Props {
  infoVisible: boolean;
  setInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsefulControls: React.FC<Props> = ({ infoVisible, setInfoVisible }) => {
  // List of keybind controls with Fortnite styling
  const controls = [
    { key: 'RMB', description: Locale.ui_rmb || 'Opens context menu' },
    { key: 'ALT + LMB', description: Locale.ui_alt_lmb || 'Uses the item' },
    { key: 'CTRL + LMB', description: Locale.ui_ctrl_lmb || 'Splits the item stack' },
    { key: 'SHIFT + Drag', description: Locale.ui_shift_drag || 'Quick moves item between inventories' },
    { key: 'CTRL + SHIFT + LMB', description: Locale.ui_ctrl_shift_lmb || 'Drops item on the ground' },
  ];

  // If not visible, don't render anything
  if (!infoVisible) return null;

  return (
    <div className="useful-controls-overlay">
      <div className="useful-controls-dialog">
        {/* Header with blue background */}
        <div className="useful-controls-dialog-header">
          <div className="useful-controls-header-accent"></div>
          <p className="useful-controls-dialog-title">{Locale.ui_usefulcontrols || 'CONTROLS'}</p>
          <button
            className="useful-controls-dialog-close"
            onClick={() => setInfoVisible(false)}
            aria-label="Close controls dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
          </button>
        </div>

        {/* Subtitle */}
        <div className="useful-controls-dialog-subtitle">
          FORTNITE INVENTORY SYSTEM
        </div>

        {/* Content */}
        <div className="useful-controls-content-wrapper">
          {controls.map((control, index) => (
            <div className="control-item" key={index}>
              <div className="control-key-wrapper">
                <kbd className="control-key">{control.key}</kbd>
              </div>
              <div className="control-description">
                {control.description}
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="dialog-footer">
            <div className="dialog-footer-icon">🔫</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsefulControls;
