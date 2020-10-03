/* Copyright (c) 2020 AutomaCoin*/

import * as d3 from "d3";
import { Terminal } from "xterm";
import { Spinner } from "spin.js";
import { SPINNEROPTS } from "../config/config";
import { toast } from 'bulma-toast';

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

/* Components */

export function dashboardComponent() {
    return {
        expand: false,
        tab: "coin",
        title: "Dashboard",
        terminal: new Terminal({
            cols: 32,
            rows: 10
        }),
        output: new Terminal({
            cols: 32,
            rows: 10
        }),
        problems: new Terminal({
            cols: 32,
            rows: 10
        }),

        init: function () {

            this.terminal.open(document.getElementById('terminal'));
            this.output.open(document.getElementById('output'));
            this.problems.open(document.getElementById('problems'));

            this.terminal.write('$ Hello from Terminal. Please Turn On.');
            this.output.write('$ Hello from Output. Please Turn On.');
            this.problems.write('$ Hello from Problems. Please Turn On.');
        },

        detach: function () {
            document.getElementById('terminalOverlay').appendChild(document.getElementById(this.tab))
            this[this.tab].resize(80, 30);

        },

        attach: function () {
            this[this.tab].resize(32, 10);
            document.getElementById('terminalHarbor').appendChild(document.getElementById(this.tab))
        }
    }
}

export function userProfileComponent() {
    return {

        onpic: false,
        isUnlocked: window.loggedIn,
        smodal: false,
        logged: Spruce.store('wallet').logged === 'true' ? true : false,
        histogram: function () {
            // document.querySelector('#histogram').appendChild(barChart([6, 10, 2]));
        },

        login: async function () {
            cancelAnimationFrame(window.id);

            if (typeof window.zilPay !== 'undefined') {

                window.zilPay.wallet.connect().then(out => {
                    Spruce.store('wallet').logged = (window.zilPay.wallet.isEnable && window.zilPay.wallet.isConnect).toString();
                    this.logged = Spruce.store('wallet').logged
                    Spruce.store('wallet').account = window.zilPay.wallet.defaultAccount.base16;

                    toast({
                        message: "ENGINE STARTED",
                        type: "is-danger",
                        duration: 2500,
                        dismissible: true,
                        animate: { in: "fadeIn", out: "fadeOut" }
                    });

                    toast({
                        message: "WELCOME ON BOARD!",
                        type: "is-success",
                        position: "top-left",
                        duration: 2500,
                        dismissible: true,
                        animate: { in: "fadeIn", out: "fadeOut" }
                    });

                    
                });
            } else {
                this.smodal = !this.smodal
            }
        }
    }
}

export function optionsComponent() {
    return {
        spinner: null,

        tab: 'console',

        fetching: false,

        init: function () {
            this.spinner = new Spinner(SPINNEROPTS)
        },

        fetch: async function () {
            this.fetching = true;
            const target = document.getElementById('spinner');
            this.spinner.spin(target);

            const response = await harvester.harvest(null, null, null, null);

            console.log(response);
            this.spinner.stop();
            this.fetching = false;

            /*const inputs = response.tm.input;
            const quadruples = response.tm.quadruples;*/

            const inputs = [3, 2];
            const quadruples = [

                [1, 'B', 'R', 2],
                [2, '1', 'R', 2]
            ]

            await engine.turing(inputs, quadruples);

        }
    }
}