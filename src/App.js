import * as React from "react";

import {Button, Card, Classes, H3} from "@blueprintjs/core";
import './App.css';
import {MLSQLAPI, ServerError, APIResponse} from "./service/MLSQLAPI";
import {OPEN_API_SPEC} from "./service/BackendConfig";
import * as HTTP from "./service/HTTPMethod"
import ActionDetail from "./components/ActionDetail";


class App extends React.Component {

    constructor(props) {
        super(props)
        const api = new MLSQLAPI(OPEN_API_SPEC)
        const self = this;
        this.state = {
            controllers: [],
            actionCard: null
        }
        /**
         *
         * @param {APIResponse} ok
         */
        const succes = (ok) => {
            if (ok.status === HTTP.Status.Success) {
                ok.content.then((s) => {
                    const res = JSON.parse(s)
                    const controllers = []

                    res.forEach((controller) => {
                        const actions = []
                        controller.actions.forEach((action) => {
                            actions.push(<ActionCard action={action} app={this}/>)
                        })

                        controllers.push(<div className="App-controller">
                            <div className="App-controller-title">{controller.name.split(".").splice(-1)[0]}</div>
                            <div>{actions}</div>
                        </div>)
                    })


                    self.setState({controllers: controllers})

                })
            }
        }
        api.request(HTTP.Method.GET, {}, succes, (notok) => {
        })
    }

    render() {
        return (
            <div className={App}>
                {this.state.actionCard ? <ActionDetail actionCard={this.state.actionCard}/> : this.state.controllers}
            </div>

        );
    }
}

class ActionCard extends React.Component {

    constructor(props) {
        super(props)
        /**
         *
         * @type {{actionCard:ActionCard app:App}}
         */
        this.state = {actionCard: this.props.action, app: this.props.app}
    }

    parameters = (params) => {
        const res = []
        params.forEach((item) => {
            if (item.name === "Usage:")
                res.push(<div>{item.description}</div>)
        })
        return res
    }

    render() {
        const actionCard = this.state.actionCard
        return (<div className="App-controller-box">
            <Card elevation={4} interactive={false}>
                <H3>
                    {actionCard.methods} {actionCard.path}
                </H3>
                <p>
                    {this.parameters(actionCard.parameters)}
                </p>
                <Button text="Detail" className={Classes.BUTTON} onClick={() => {
                    this.detail()
                }}/>
            </Card>
        </div>)
    }

    detail = () => {
        this.state.app.setState({actionCard: this.state.actionCard})
    }
}

export default App;
