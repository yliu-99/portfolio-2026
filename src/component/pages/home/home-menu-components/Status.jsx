import MenuTemplate from './MenuTemplate';

const data = {
    availability: 'OPEN',
    mode: 'DEEP WORK',
    location: 'REMOTE',
    response: '< 24H',
};

const Row = ({ label, value, highlight }) => (
    <div className="flex justify-between items-center w-full gap-2">
        <span className="text-[0.8rem] tracking-[0.1em] opacity-50 shrink-0">{label}</span>
        <span className={`tracking-[0.05em] text-right ${highlight ? 'text-base text-blue' : 'text-[0.85rem]'}`}>
            {value}
        </span>
    </div>
);

const Divider = () => <div className="w-full h-px bg-black/15" />;

function Status() {
    return (
        <MenuTemplate title="Current Status">
            <Row label="AVAIL" value={data.availability} highlight />
            <Divider />
            <Row label="MODE"  value={data.mode} />
            <Divider />
            <Row label="LOC"   value={data.location} />
            <Divider />
            <Row label="REPLY" value={data.response} />
        </MenuTemplate>
    );
}

export default Status;
