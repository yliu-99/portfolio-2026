import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '../../../data/icons';
import './Playground.scss';

function Playground() {
  return (
    <div className="playground-container col-span-12">

      {/* Page title — red variant of the Projects heading style */}
      <div className="playground-title-box font-title text-h2 flex items-center gap-3 bg-red text-white pl-6 pr-6 mb-12">
        <h1 className="mt-2">PLAYGROUND</h1>
        <span><FontAwesomeIcon icon={faCaretRight} /></span>
      </div>

      {/* Under construction message */}
      <p className="playground-message font-body">
        The playground is still under construction...come back later for my fun personal projects!
      </p>

    </div>
  );
}

export default Playground;