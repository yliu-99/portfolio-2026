// import dependancies
import { Icon } from '@iconify/react';

// import data
import { toolIcons } from '../../../data/icons';

// import style

function MyTools() {
    return (
        <section>
            <div className='section introduction'></div>
            <div className='tools'>
                {toolIcons.map((group) => (
                    <div key={group.category} className='tool-group'>
                        <h3 className='tool-category'>{group.category}</h3>
                        <div className='tool-list'>
                            {group.tools.map((tool) => (
                                <div key={tool.name} className='tool-item'>
                                    <Icon icon={tool.icon} />
                                    <span>{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MyTools;
