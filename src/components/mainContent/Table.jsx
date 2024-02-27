import React from "react";
import { useState, useRef, useEffect } from "react";
import "./table.scss";

const data = [
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+a", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 97+ plus / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Gecko", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Gecko", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Gecko", "Firefox 2.0", "Win 97+ plus / OSX.2+D", "1.7", "D"],
    ["Gecko", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Gecko", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Bao", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Bao", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Bao", "Firefox 2.0", "Win 97+ plus / OSX.2+", "1.7", "D"],
    ["Bao", "Firefox 2.0", "Win 98+ / OSX.2+", "1.7", "D"],
    ["Bao", "Firefox 2.0", "Win 98+ / OSX.2+", "1.7", "D"],
    ["Bao", "Firefox 2.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 2.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 2.0", "Win 98+ / OSX.2+a", "1.7", "A"],
    ["Bao", "Firefox 2.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Bao", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+a", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+a", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+a", "1.7", "A"],
    ["Dang", "Firefox 3.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Dang", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
    ["Gecko", "Firefox 1.0", "Win 98+ / OSX.2+", "1.7", "A"],
];

const tableIndex = ["1", "2", "3", "4", "5", "6"];

export default function Table() {
    const [currentPage, setCurrentPage] = useState(0);
    const [currentTable, setCurrentTable] = useState(data.slice(0, 10));
    const itemPerPage = useRef(10);
    useEffect(() => {
        const startIndex = currentPage * itemPerPage.current;
        const endIndex = Math.min(
            data.length,
            startIndex + itemPerPage.current
        );
        setCurrentTable(data.slice(startIndex, endIndex));
    }, [currentPage]);

    function handleClickPagination(index) {
        setCurrentPage(index);
    }
    function handleClickNext() {
        setCurrentPage(currentPage + 1);
    }
    function handleClickPrevious() {
        setCurrentPage(currentPage - 1);
    }

    return (
        <div>
            <div className="table__component">
                <div className="table__header">
                    <div className="table__header--left">
                        <h3>Data tables</h3>
                        <span>advanced table</span>
                    </div>
                    <div className="table__header--right">
                        <div>
                            <i className="fa-solid fa-gauge"></i>
                            <span>Home</span>
                        </div>
                        <i className="fa-solid fa-chevron-right"></i>
                        <a>Tables</a>
                        <i className="fa-solid fa-chevron-right"></i>
                        <a style={{ color: "#777777" }}>Data tables</a>
                    </div>
                </div>

                <div className="Table">
                    <h3 className="table__title">Hover Data Tables</h3>

                    <div className="table__content">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Rendering Engine
                                        <i
                                            className="fa-solid fa-arrow-down-short-wide"
                                            style={{
                                                opacity: "0.7",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        Browser
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        Platform
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        Engine version
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                    <th scope="col">
                                        CSS grade
                                        <i
                                            className="fa-solid fa-sort"
                                            style={{
                                                opacity: "0.2",
                                                cursor: "pointer",
                                            }}
                                        ></i>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentTable.map(function (row, index) {
                                    return (
                                        <tr key={index}>
                                            {row.map(function (element, cnt) {
                                                return (
                                                    <td key={cnt}>{element}</td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>

                            <tfoot>
                                <tr>
                                    <th scope="col">Rendering Engine</th>
                                    <th scope="col">Browser</th>
                                    <th scope="col">Platform</th>
                                    <th scope="col">Engine version</th>
                                    <th scope="col">CSS grade</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="table__action">
                        <div className="table__action--left">
                            {`Showing ${
                                currentPage * itemPerPage.current + 1
                            } to
                ${Math.min(
                    currentPage * itemPerPage.current + itemPerPage.current,
                    data.length
                )} of ${data.length + 1} entries`}
                        </div>

                        <div className="table__action--right">
                            <div className="table__pagination">
                                <ul className="list__action">
                                    <li
                                        className="previous"
                                        style={{
                                            pointerEvents:
                                                currentPage === 0
                                                    ? "none"
                                                    : "auto",
                                            cursor: "pointer",
                                        }}
                                        onClick={handleClickPrevious}
                                    >
                                        Previous
                                    </li>
                                    {tableIndex.map((item, index) => {
                                        return (
                                            <li
                                                className={
                                                    currentPage === index
                                                        ? "pagination__item active"
                                                        : "pagination__item"
                                                }
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handleClickPagination(index)
                                                }
                                            >
                                                {item}
                                            </li>
                                        );
                                    })}

                                    <li
                                        className="next"
                                        style={{
                                            pointerEvents:
                                                currentPage === 5
                                                    ? "none"
                                                    : "auto",
                                        }}
                                        onClick={handleClickNext}
                                    >
                                        Next
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
