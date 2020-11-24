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
        histogram: function () {
        },

        login: async function () {

            if (typeof window.zilPay !== 'undefined') {
                const isConnect = await window.zilPay.wallet.connect();
                if (isConnect) {
                    console.log(isConnect);

                    const response = await harvester.account(window.zilPay.wallet.defaultAccount.base16, Spruce.store('wallet').nonce, (await window.zilPay.wallet.sign(MESSAGE.SIGNIN + Spruce.store('wallet').nonce)).signature);
                    if (response.client) {

                        this.logged = true;
                        Spruce.store('wallet').nonce = response.nonce;
                        Spruce.store('wallet').balance = response.automacoin;
                        Spruce.store('wallet').logged = this.logged.toString();
                        Spruce.store('wallet').account = window.zilPay.wallet.defaultAccount.base16;
                        console.log(response);
                    }
                } else {
                    this.logged = false;
                    throw new Error('user rejected');
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
        spinner: null,

        tab: 'console',

        loading: false,

        computing: false,

        workunit: null,

        init: function () {
            this.spinner = new Spinner(SPINNEROPTS)
        },

        abort: function () {
            Spruce.store('engine').state = 'ready';
            this.spinner.stop();
        },

        fire: async function () {
            try {
                const target = document.getElementById('spinner');
                this.spinner.spin(target);
                Spruce.store('engine').state = 'ongoing';
                PubSub.publish('TERMINAL', 'Starting computation...');

                toast({
                    message: "Engine Started!",
                    type: "is-danger",
                    duration: 1250,
                    dismissible: true,
                    animate: { in: "fadeIn", out: "fadeOut" }
                });


                this.loading = true;

                //const tapes = await engine.ignite(2, 2, 2000, 4607, 5615);

                const tapes = await engine.ignite(this.workunit.states, this.workunit.colors, this.workunit.runtime, this.workunit.tm_set[0], this.workunit.tm_set[1]);

                console.log(tapes);

                PubSub.publish('OUTPUT', `The output of computation is:...`);
                PubSub.publish('TERMINAL', 'Computation is complete.');
                PubSub.publish('TERMINAL', 'Submitting signed output to Network.');

                await harvester.dispatch(this.workunit.from, this.workunit.assigned, this.workunit.workload_ID, this.workunit.tm_set, tapes, nonce, await window.zilPay.wallet.sign('TEST'));

                PubSub.publish('TERMINAL', 'Submission complete. Job is over, fetch new data.');
            } catch (error) {
                PubSub.publish('ERROR', error.message);
            } finally {
                Spruce.store('engine').state = 'ready';
                this.loading = false;
                this.spinner.stop();
            }
        },

        fetch: async function () {

            try {
                const target = document.getElementById('spinner');
                this.spinner.spin(target);

                Spruce.store('engine').state = 'fetching';

                PubSub.publish('TERMINAL', 'Fetching Turing Machines ...');

                const signature = await window.zilPay.wallet.sign('hello');

                this.workunit = await harvester.allocate(Spruce.store('wallet').account, Spruce.store('wallet').nonce, signature);

                toast({
                    message: "Fetching new Data...",
                    type: "is-warning",
                    duration: 1250,
                    dismissible: true,
                    animate: { in: "fadeIn", out: "fadeOut" }
                });

                this.loading = true;
            } catch (error) {
                PubSub.publish('ERROR', error.message);
            } finally {

                Spruce.store('engine').state = 'ready';
                this.spinner.stop();
                this.loading = false;
            }

            Spruce.store('engine').state = 'ready';
            PubSub.publish('TERMINAL', 'Work unit loaded in memory, ready to compute.');

        }
    }
}