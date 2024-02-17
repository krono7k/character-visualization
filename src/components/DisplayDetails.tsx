const DisplayDetails = ({
    detailName,
    detailValue,
}: {
    detailName: string;
    detailValue: string;
}) => {
    return <>
        {
            detailValue ?
            <div>
                <span className="font-bold text-sm">{detailName}: </span>
                <span className="text-sm">{detailValue}</span>
            </div> 
            : null
        }
    </>
};

export default DisplayDetails;