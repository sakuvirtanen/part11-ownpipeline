const FilterInput = ({ searchCondition, handleSearch }) => {
    return (
        <div>
            filter shown with: <input
                value={searchCondition}
                onChange={handleSearch}
            />
        </div>
    )
}

export default FilterInput