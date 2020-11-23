/* Copyright (c) 2020 AutomaCoin*/

import { Terminal } from "xterm";
import { Spinner } from "spin.js";
import { SPINNEROPTS } from "../config/config";
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

            this.terminal.writeln('$ ready.');
            this.output.writeln('$ ready.');
            this.problems.writeln('$ ready.');
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
        logged: Spruce.store('wallet').logged === 'true' ? true : false,
        histogram: function () {
        },

        login: async function () {

            if (typeof window.zilPay !== 'undefined') {

                window.zilPay.wallet.connect().then(out => {
                    Spruce.store('wallet').logged = (window.zilPay.wallet.isEnable && window.zilPay.wallet.isConnect).toString();
                    this.logged = Spruce.store('wallet').logged
                    Spruce.store('wallet').account = window.zilPay.wallet.defaultAccount.base16;

                    toast({
                        message: "Welcome on board!",
                        type: "is-success",
                        duration: 1250,
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

        loading: false,

        computing: false,

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
                console.log(await engine.run(2, 2, 2000, 4607, 5615));

                PubSub.publish('OUTPUT', `The output of computation is:...`);
                PubSub.publish('TERMINAL', 'Computation is complete.');
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
                Spruce.store('engine').state = 'fetching';

                PubSub.publish('TERMINAL', 'Trying to log in if signed ...');

                //harvester.account(client, nonce, signature);

                PubSub.publish('TERMINAL', 'Fetching Turing Machines ...');

                toast({
                    message: "Fetching new Data...",
                    type: "is-warning",
                    duration: 1250,
                    dismissible: true,
                    animate: { in: "fadeIn", out: "fadeOut" }
                });

                this.loading = true;
                const target = document.getElementById('spinner');
                this.spinner.spin(target);

               // const response = await harvester.harvest(null, null, null, null);
                console.log({});
            } catch (error) {
                PubSub.publish('ERROR', error.message);
            } finally {

                Spruce.store('engine').state = 'ready';
                this.spinner.stop();
                this.loading = false;
            }

            Spruce.store('engine').state = 'ready';
            PubSub.publish('TERMINAL', 'Turing Machines loaded in memory, ready to compute.');

        }
    }
}