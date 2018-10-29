import * as React from "react";
import {Cell, Column, JSONFormat, Table, RenderMode} from "@blueprintjs/table";

export default class ActionDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {actionCard: this.props.actionCard}
    }

    render() {

        /**
         *
         * @type {{methods:string,
         * path:string,
         * parameters:[
         * {
         * name:string,
         * type:string,
         * description:string,
         * required:string,
         * allowEmptyValue:string,
         * allowReserved:string}
         * ],
         * responses:[
         * {
         * responseCode:string,
         * description:string,
         * content:{mediaType:string,schema:{type:string,description:string,implementation:[{}]}}}
         * ]}}
         */
        const actionCard = this.state.actionCard
        const parameters = this.state.actionCard.parameters
        const responses = this.state.actionCard.responses

        const renderData = (data) => {
            const columns = []
            const keyExist = {}
            const handleType = (o) => {
                if (typeof o === "boolean") {
                    return o + ""
                }
                if (typeof o === "object") {
                    return JSON.stringify(o, null, 2)
                }
                return o
            }
            data.forEach((item) => {
                Object.keys(item).forEach((key) => {
                    if (!keyExist[key]) {
                        columns.push(<Column name={key} cellRenderer={(index) => {
                            const columnValues = []
                            data.forEach((p) => {
                                columnValues.push(handleType(p[key]))
                            })
                            return <Cell>
                                {columnValues[index]}
                            </Cell>
                        }}/>)
                        keyExist[key] = 1
                    }

                })
            })
            return columns
        }
        const parametersColumns = renderData(parameters)
        const responseColumns = renderData(responses)


        return (
            <div className="App-action-detail">
                <div>{actionCard.methods} {actionCard.path}</div>
                <div>parameters:
                    <Table numRows={actionCard.parameters.length} enableColumnResizing={true} enableRowResizing={true}
                           renderMode={RenderMode.BATCH}>
                        {parametersColumns}
                    </Table>
                </div>
                <div>responses:
                    <Table numRows={actionCard.responses.length}>
                        {responseColumns}
                    </Table>
                </div>

            </div>

        )
    }
}