/* Copyright (c) 2020 AutomaCoin*/

import * as d3 from "d3";

function barChart(data) {
    const div = d3.create("div")
        .style("font", "10px sans-serif")
        .style("text-align", "right")
        .style("color", "white");

    div.selectAll("div")
        .data(data)
        .join("div")
        .style("background", "steelblue")
        .style("padding", "3px")
        .style("margin", "1px")
        .style("width", d => `${d * 10}px`)
        .text(d => d);

    return div.node();
}

export function ultimateQuestion() {
    return 42;
}

export function dashboardComponent() {
    return {
        title: "Your Dashboard"
    }
}

export function userProfileComponent() {
    return {

        

        histogram: () => {
            document.querySelector('#histogram').appendChild(barChart([6,10,2]));
        }

    }
}