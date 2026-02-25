import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

function FlaotingMenu () {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="menu-container">
            <div className="menu-nav" onClick={() => setIsOpen(prev => !prev)}>
                <div className="title">{title}</div>
                <div className="toggle">
                    <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} style={{ color: 'blue' }} />
                </div>
            </div>
            {isOpen && (
                <div className="menu-content">
                </div>
            )}
        </div>
    );
}