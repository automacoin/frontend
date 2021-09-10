/* Copyright (c) 2020 AutomaCoin*/

import { Terminal } from "xterm";
import { Spinner } from "spin.js";
import { SPINNEROPTS, MESSAGE } from "../config/config";
import { toast } from 'bulma-toast';
import PubSub from 'pubsub-js';

export function ultimateQuestion() {
    return 43;
}

/* Components */

export function dashboardComponent() {
    return {
        expand: false,
        tab: "terminal",
        title: "Board",
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

        download: function (filename, text) {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },

        startDownload: function () {
            const term = this[this.tab]
            term.selectAll();
            const text = term.getSelection();
            const filename = this.tab + Date.now() + ".log";

            this.download(filename, text);
            term.clearSelection();
        },

        subscription: function (c) {
            let that = this;
            let sub;
            switch (c) {
                case 0:
                    sub = (msg, data) => that.terminal.writeln(`[${Date.now()}][ATC] ${data}`);
                    break;
                case 1:
                    sub = (msg, data) => that.problems.writeln(`[${Date.now()}][ATC] ${data}`);
                    break;
                case 2:
                    sub = (msg, data) => that.output.writeln(`[${Date.now()}][ATC] ${data}`);
                    break;
                default:
                    sub = (msg, data) => console.log(`[${Date.now()}][ATC] ${data}`);
            }
            return sub;
        },

        init: function () {

            Spruce.watch('wallet.logged', logged => {
                this.tab = 'terminal';
            });

            this.tokenOutput = PubSub.subscribe('OUTPUT', this.subscription(2));
            this.tokenTerminal = PubSub.subscribe('TERMINAL', this.subscription(0));
            this.tokenProblems = PubSub.subscribe('PROBLEMS', this.subscription(1));

            this.terminal.open(document.getElementById('terminal'));
            this.output.open(document.getElementById('output'));
            this.problems.open(document.getElementById('problems'));

            this.terminal.writeln(`[${Date.now()}][ATC] Terminal ready.`);
            this.output.writeln(`[${Date.now()}][ATC] Output ready.`);
            this.problems.writeln(`[${Date.now()}][ATC] Problems ready.`);
        },

        clearBuff: function (buff) {
            this[buff].clear();
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

        modalShow: false,
        logged: false,
        isSigning: false,

        balance: async function () {
            const response = await harvester.account(window.zilPay.wallet.defaultAccount.base16, Spruce.store('wallet').nonce, '');
            Spruce.store('wallet').nonce = response.nonce;
            Spruce.store('wallet').balance = response.automacoin;
        },

        login: async function () {

            if (typeof window.zilPay !== 'undefined') {
                const isConnect = await window.zilPay.wallet.connect();
                if (isConnect) {

                    let signature;
                    let response;
                    this.isSigning = true;
                    try {
                        try {
                            signature = await window.zilPay.wallet.sign('I\'m logging in');
                        } catch (e) {
                            PubSub.publish('ERROR', e.message);
                            throw new Error('User refuse to sign in.')
                        }

                        try {
                            //deactivate in production
                            response = {
                                client: window.zilPay.wallet.defaultAccount.base16,
                                nonce: 42,
                                automacoin: 24,
                            }

                            //activate in production
                            //response = await harvester.account(window.zilPay.wallet.defaultAccount.base16, Spruce.store('wallet').nonce, signature);
                        } catch (e) {
                            PubSub.publish('ERROR', e.message);
                            throw new Error('Unable to connect to node.')
                        }

                        if (response.client) {
                            this.logged = true;
                            this.isSigning = false;
                            Spruce.store('wallet').nonce = response.nonce;
                            Spruce.store('wallet').balance = response.automacoin;
                            Spruce.store('wallet').logged = this.logged.toString();
                            Spruce.store('wallet').account = window.zilPay.wallet.defaultAccount.base16;

                            toast({
                                message: "Welcome on board!",
                                type: "is-success",
                                duration: 1250,
                                dismissible: true,
                                animate: { in: "fadeIn", out: "fadeOut" }
                            });
                        }

                    } catch (error) {
                        console.log(error)
                        PubSub.publish('PROBLEMS', error.message);

                        toast({
                            message: error.message,
                            type: "is-danger",
                            duration: 1250,
                            dismissible: true,
                            animate: { in: "fadeIn", out: "fadeOut" }
                        });

                        this.logged = false;
                        throw new Error('Error during fetch phase.');

                    } finally {
                        this.isSigning = false;
                    }

                } else {

                    PubSub.publish('PROBLEMS', 'User refused to connect wallet.');
                    throw new Error('user not connected');
                }


            } else {
                this.modalShow = !this.modalShow;
            }
        }
    }
}

export function optionsComponent() {

    return {

        spinner: null,

        tab: 'console',

        workunit: null,

        control: 'Idle.',

        init: function () {
            this.spinner = new Spinner(SPINNEROPTS)
        },

        go: async function () {

            const control = document.getElementById('engineControl');
            if (control.checked == true) {

                const target = document.getElementById('spinner');
                this.spinner.spin(target);

                this.control = "Running.";
                toast({
                    message: "Engine Started!",
                    type: "is-info",
                    duration: 900,
                    dismissible: true,
                    animate: { in: "fadeIn", out: "fadeOut" }
                });

                while (document.getElementById('engineControl').checked === true) {
                    try {
                        await this.fetch();
                        await this.fire();
                    } catch (e) {

                        toast({
                            message: "Fatal Error. Aborting.",
                            type: "is-danger",
                            duration: 1450,
                            dismissible: true,
                            animate: { in: "fadeIn", out: "fadeOut" }
                        });

                        this.control = "Idle.";
                        document.getElementById('engineControl').checked = false;
                        PubSub.publish('PROBLEMS', 'Problems during execution: ' + e.message);
                        this.spinner.stop()
                    }
                }

                PubSub.publish('PROBLEMS', 'Execution stopped.');
                this.spinner.stop();

            } else {
                toast({
                    message: "Execution stopped.",
                    type: "is-danger",
                    duration: 1000,
                    dismissible: true,
                    animate: { in: "fadeIn", out: "fadeOut" }
                });
                this.control = "Idle.";
            }

        },


        fire: async function () {
            try {
                PubSub.publish('TERMINAL', `Simulating machines from ${this.workunit.tm_set[0]} to ${this.workunit.tm_set[1]}.`);

                const tapes = await engine.ignite(this.workunit.states, this.workunit.colors, this.workunit.runtime, this.workunit.tm_set[0], this.workunit.tm_set[1]);

                PubSub.publish('OUTPUT', `The output of computation is stored in memory.`);
                PubSub.publish('TERMINAL', `Computation happened in  D(${this.workunit.colors}, ${this.workunit.states}).`);
                PubSub.publish('TERMINAL', `Submitting signed output of Workload with ID:${this.workunit.workload_ID} to Network.`);

                let { from, assigned, workload_ID, turing_machines } = this.workunit;
                await harvester.dispatch(from, assigned, workload_ID, turing_machines, tapes, 2, '');
                PubSub.publish('TERMINAL', 'Submission complete. Job is over, fetch new data.');
            } catch (error) {
                PubSub.publish('ERROR', error.message);
                throw new Error('Submission of tapes or something during computation went wrong.');
            }
        },

        fetch: async function () {

            try {

                PubSub.publish('TERMINAL', 'Fetching Turing Machines bricks.');

                try {
                    this.workunit = await harvester.allocate(Spruce.store('wallet').account, Spruce.store('wallet').nonce, '');
                } catch (e) {
                    throw new Error(e.message);
                }


                PubSub.publish('TERMINAL', 'Workload is in memory, ready to be done.');
            } catch (error) {
                PubSub.publish('ERROR', error.message);
                throw new Error('Error during fetch phase.');
            }

        }
    }
}