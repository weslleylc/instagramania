import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

function CustomPagination ({page, setPage, maxPage}) {

    const nextFunction = () => {
        if (page < maxPage){
            setPage(page + 1)
        }
        console.log(page)
    }

    const previousFunction = () => {
        if (page > 1){
            setPage(page - 1)
        }
        console.log(page)
    }
    const renderRow = (i) => {
        return <PaginationItem key={i}>
                    <PaginationLink onClick={()=>{setPage(i)}}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
    }

    let rows = []
    for (let i = Math.max(page -3, 1); i < Math.min(page + 3, maxPage)+1; i++) {
        rows.push(i)
    }

    return (

        <Pagination aria-label="Page navigation " style={{justifyContent: 'center'}}>
            <PaginationItem>
                <PaginationLink first onClick={()=>{setPage(1)}}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous onClick={previousFunction} />
            </PaginationItem>
            {rows.map(renderRow)}
            <PaginationItem>
                <PaginationLink next  onClick={nextFunction}/>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last  onClick={()=>{setPage(maxPage)}}/>
            </PaginationItem>
        </Pagination>
    );
}

export default CustomPagination;