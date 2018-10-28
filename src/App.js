import * as React from "react";

import {Button, Card, Classes, Elevation, H3, Label, Slider, Switch} from "@blueprintjs/core";
import './App.css';
import {MLSQLAPI, ServerError, APIResponse} from "./service/MLSQLAPI";
import {OPEN_API_SPEC} from "./service/BackendConfig";
import * as HTTP from "./service/HTTPMethod"


class App extends React.Component {

    constructor(props) {
        super(props)
        const api = new MLSQLAPI(OPEN_API_SPEC)
        const self = this;
        this.state = {
            controllers: []
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
                            actions.push(<ActionCard action={action}/>)
                        })

                        controllers.push(<div className="App-controller">
                            <H3>{controller.name}</H3>
                            {actions}
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
                {this.state.controllers}
            </div>

        );
    }
}

class ActionCard extends React.Component {

    parameters = (params) => {
        const res = []
        params.forEach((item) => {
            res.push(<p>
                {item.name}
            </p>)
        })
        return res
    }

    render() {
        const actionCard = this.props.action
        return (<div className="App-controller-box">
            <Card elevation={4} interactive={false}>
                <H3>
                    {actionCard.methods} {actionCard.path}
                </H3>
                <p>params:</p>
                <p>
                    {this.parameters(actionCard.parameters)}
                </p>
                <Button text="Explore products" className={Classes.BUTTON}/>
            </Card>
        </div>)
    }
}

export default App;
