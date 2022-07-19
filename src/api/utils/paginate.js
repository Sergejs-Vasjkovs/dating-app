const paginate = (items, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * 2;
    return [...items].splice(startIndex, pageSize);
};

export default paginate;
