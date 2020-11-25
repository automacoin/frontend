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

        subscription: function (c) {
            let that = this;
            let sub;
            switch (c) {
                case 0:
                    sub = (msg, data) => that.terminal.writeln(`$ ${data}`);
                    break;
                case 1:
                    sub = (msg, data) => that.problems.writeln(`$ ${data}`);
                    break;
                case 2:
                    sub = (msg, data) => that.output.writeln(`$ ${data}`);
                    break;
                default:
                    sub = (msg, data) => console.log(`$ ${data}`);
            }
            return sub;
        },

        token: null,

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

            this.terminal.writeln('$ Terminal ready.');
            this.output.writeln('$ Output ready.');
            this.problems.writeln('$ Problems ready.');
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

        onpic: false,
        isUnlocked: window.loggedIn,
        smodal: false,
        logged: false,
        isSigning: false,
        histogram: function () {
        },

        login: async function () {

            if (typeof window.zilPay !== 'undefined') {
                const isConnect = await window.zilPay.wallet.connect();
                if (isConnect) {

                    this.isSigning = true;
                    try {
                        const response = await harvester.account(window.zilPay.wallet.defaultAccount.base16, Spruce.store('wallet').nonce, await window.zilPay.wallet.sign('I\'m logging in'));

                        if (response.client) {

                            this.logged = true;
                            this.isSigning = false;
                            Spruce.store('wallet').nonce = response.nonce;
                            Spruce.store('wallet').balance = response.automacoin;
                            Spruce.store('wallet').logged = this.logged.toString();
                            Spruce.store('wallet').account = window.zilPay.wallet.defaultAccount.base16;
                        }

                    } catch (e) {

                        this.logged = false;
                        this.isSigning = false;
                        PubSub.publish('PROBLEMS', 'User refused to sign login message.');
                        throw new Error('user rejected');
                    }


                } else {

                    PubSub.publish('PROBLEMS', 'User refused to connect wallet.');
                    throw new Error('user not connected');
                }

                toast({
                    message: "Welcome on board!",
                    type: "is-success",
                    duration: 1250,
                    dismissible: true,
                    animate: { in: "fadeIn", out: "fadeOut" }
                });
            } else {
                this.smodal = !this.smodal;
            }


        }
    }
}

export function optionsComponent() {

    return {

        aborter: null,

        spinner: null,

        tab: 'console',

        loading: false,

        computing: false,

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

                this.control = "Up and running.";
                toast({
                    message: "Engine Started!",
                    type: "is-info",
                    duration: 1250,
                    dismissible: true,
                    animate: { in: "fadeIn", out: "fadeOut" }
                });

                while (document.getElementById('engineControl').checked === true) {
                    await this.fetch();
                    await this.fire();
                }

                PubSub.publish('PROBLEMS', 'Execution stopped by User.');
                Spruce.store('engine').state = 'ready';
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
                Spruce.store('engine').state = 'ongoing';
                PubSub.publish('TERMINAL', 'Starting computation.');

                this.loading = true;

                const tapes = await engine.ignite(this.workunit.states, this.workunit.colors, this.workunit.runtime, this.workunit.tm_set[0], this.workunit.tm_set[1]);

                PubSub.publish('OUTPUT', `The output of computation is.`);
                PubSub.publish('TERMINAL', 'Computation is complete.');
                PubSub.publish('TERMINAL', 'Submitting signed output to Network.');

                let { from, assigned, workload_ID, turing_machines } = this.workunit;
                await harvester.dispatch(from, assigned, workload_ID, turing_machines, tapes, 2, '');
                PubSub.publish('TERMINAL', 'Submission complete. Job is over, fetch new data.');
            } catch (error) {
                PubSub.publish('PROBLEMS', 'Submission of tapes or their computation went wrong.');
                PubSub.publish('ERROR', error.message);
            } finally {
                Spruce.store('engine').state = 'ready';
                this.loading = false;
            }
        },

        fetch: async function () {

            try {

                Spruce.store('engine').state = 'fetching';

                PubSub.publish('TERMINAL', 'Fetching Turing Machines.');

                this.workunit = await harvester.allocate(Spruce.store('wallet').account, Spruce.store('wallet').nonce, '');

                this.loading = true;
            } catch (error) {
                PubSub.publish('ERROR', error.message);
            } finally {

                Spruce.store('engine').state = 'ready';
                this.loading = false;
            }

            Spruce.store('engine').state = 'ready';
            PubSub.publish('TERMINAL', 'Workload is in memory, ready to be done.');

        }
    }
}