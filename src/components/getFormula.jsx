import React, { Component } from 'react'
import './getFormula.css';

export default class GetFormula extends Component {

    constructor(props) {
        super(props);

        this.state = {
            catetoAValor: "",
            catetoBValor: "",
            hipotenusaValor: "",
            resp: "",
            respText: ""

        }

        this.setResp = this.setResp.bind(this)
        this.formula = this.formula.bind(this)
    }

    formula() {
        let catA = this.state.catetoAValor
        let catB = this.state.catetoBValor
        let hip = this.state.hipotenusaValor
        let resp = ''
        let respText = ''

        if (hip === "" && catA !== "" && catB !== "") {
            resp = catA * catA + catB * catB
            respText = 'Esse é o valor da Hipotenusa'
            resp = `${Math.sqrt(resp).toFixed(2).replace('.', ',')}`

        }
        else if (catA !== "" && hip !== "") {
            resp = hip * hip - catA * catA
            respText = 'Esse é o valor do Cateto B'
            resp = `${Math.sqrt(resp).toFixed(2).replace('.', ',')}`
        }
        else if (catB !== "" && hip !== "") {
            resp = hip * hip - catB * catB
            respText = 'Esse é o valor do Cateto A'
            resp = `${Math.sqrt(resp).toFixed(2).replace('.', ',')}`
        }
        else {
            resp = "Preencha os campos para realizar os cálculos!"
        }
        this.setState({ resp: resp, respText: respText })
    }

    setResp(Event, campo) {
        this.setState({ [`${campo}Valor`]: Event.target.value }, () => {
            this.formula()
        })
    }

    render() {
        return (
            <div className="getFormula">
                <form>
                    <div className="form-group">
                        <label for="catetoA">Cateto A:</label>
                        <input type="number" id="catetoA" placeholder="Ex: 3" onChange={(Event) => { this.setResp(Event, 'catetoA') }}
                            disabled={this.state.catetoBValor.length > 0 && this.state.hipotenusaValor > 0}
                        />
                        <label for="catetoB">Cateto B:</label>
                        <input type="number" id="catetoB" placeholder="Ex: 4" onChange={(Event) => { this.setResp(Event, 'catetoB') }}
                            disabled={this.state.catetoAValor.length > 0 && this.state.hipotenusaValor > 0}
                        />
                        <label for="Hipotenusa">Hipotenusa:</label>
                        <input type="number" id="Hipotenusa" placeholder="Ex: 5" onChange={(Event) => { this.setResp(Event, 'hipotenusa') }}
                            disabled={this.state.catetoAValor.length > 0 && this.state.catetoBValor > 0}
                        />
                        <div className="resultado">
                            {this.state.respText && <div>{this.state.respText}</div>}
                            {this.state.resp && <div className="calcular">{this.state.resp}</div>}
                            {this.state.resp && this.state.catetoAValor && this.state.catetoBValor ?
                                <div>Fórmula utilizada para encontrar a Hipotenusa: h² = a² + b²</div> : ""}

                            {this.state.hipotenusaValor && this.state.catetoBValor && this.state.resp ?
                                <div>Fórmula utilizada para encontrar o Cateto {this.state.catetoAValor ? 'B' : 'A'}: h² - b² = a²</div> : ""}

                            {this.state.hipotenusaValor && this.state.catetoAValor && this.state.resp ?
                                <div>Fórmula utilizada para encontrar o Cateto {this.state.catetoAValor ? 'B' : 'A'}: h² - a² = b²</div> : ""}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}