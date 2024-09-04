import { useState } from "react";

export default function FilterButton(props) {

    return (
        <button type="button"
            className="filter-button"
            onClick={() => props.setFilter(props.name)}
        >
            Show {props.name} tasks
        </button>
    );
}