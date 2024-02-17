const DisplayDetails = ({
    detailName,
    detailValue,
}: {
    detailName: string;
    detailValue: string;
}) => {
    return (
        <div>
            <span className="font-semibold">{detailName}: </span>
            <span>{detailValue}</span>
        </div>
    );
};

export default DisplayDetails;