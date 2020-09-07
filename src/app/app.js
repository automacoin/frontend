/* Copyright (c) 2020 AutomaCoin*/

import * as d3 from "d3";
import { Terminal } from "xterm";
import { Spinner } from "spin.js";
import { SPINNEROPTS } from "../config/config"

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
    return 43;
}

export function dashboardComponent() {
    return {
        tab: "sources",
        title: "Your Dashboard",
        term: new Terminal({
            cols: 40,
            rows: 12
        }),
        termOutput: new Terminal({
            cols: 40,
            rows: 12
        }),
        termProblems: new Terminal({
            cols: 40,
            rows: 12
        }),

        init: function () {
            this.term.open(document.getElementById('term'));
            this.termOutput.open(document.getElementById('termOutput'));
            this.termProblems.open(document.getElementById('termProblems'));

            this.term.write('Hello from Terminal');
            this.termOutput.write('Hello from Output');
            this.termProblems.write('Hello from Problems');
        }
    }
}

export function userProfileComponent() {
    return {

        onpic: false,

        smodal: false,

        histogram: () => {
            document.querySelector('#histogram').appendChild(barChart([6, 10, 2]));
        }

    }
}

export function optionsComponent() {
    return {
        spinner: null,

        fetching: false,

        fetch: function () {

            this.fetching = true;
            const target = document.getElementById('spinner');
            this.spinner = new Spinner(SPINNEROPTS).spin(target);
            setInterval(() => {
                this.spinner.stop();
                this.spinner = null;
                this.fetching = false;
            }, 5000)
        }
    }
}