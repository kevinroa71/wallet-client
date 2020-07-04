<template>
    <div class="card">
        <div class="card-body">
            <h2 class="card-title">
                <i class="fas fa-shopping-cart"></i> Realizar un Pago
            </h2>
            <br>
            <b>Instrucciones:</b>
            <ol class="text-justify">
                <li>Ingrese una <b>descripcion y el total</b> a pagar.</li>
                <li>Luego presione al boton de enviar.</li>
                <li>Si todo sale correctamente se abrira un formulario de confirmacion donde tendra <b>10 minutos para poder validar su pago.</b></li>
                <li>Abra su correo electronico y revise la bandeja de entrada donde se le enviara un mensaje con el <b>token de verificacion.</b></li>
                <li>Copie el token enviado al correo en el formulario de verificacion y presione el boton de enviar.</li>
                <li>Si los <b>datos son correctos</b> se procedera a descontar el monto de su saldo!</li>
                <li>Una vez realizado todos los pasos anteriores su pago abra finalizado con exito.</li>
            </ol>

            <form v-on:submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="descripcionPagoInput">Descripcion</label>
                    <input type="text" class="form-control" id="descripcionPagoInput" required v-model.number="pago.descripcion">
                </div>
                <div class="form-group">
                    <label for="montoPagoInput"><i class="fas fa-dollar-sign"></i> Monto</label>
                    <input type="number" class="form-control" id="montoPagoInput" required v-model.number="pago.monto" min="0.01" step="0.01">
                </div>
                <button type="submit" v-bind:disabled="sending" class="btn btn-primary btn-block btn-lg">
                    <i v-if="sending" class="fas fa-spinner fa-spin"></i> Enviar Pago
                </button>
                <br>
                <div v-for="error in errors" v-bind:key="error">
                    <div class="alert alert-danger" role="alert">
                        <i class="fas fa-info-circle"></i> {{ error }}
                    </div>
                </div>
            </form>
        </div>
        <Confirmar v-bind:idmodal="idmodal" v-bind:session="pago.session" />
    </div>
</template>

<script>
import Api from '../services/api';
import Confirmar from './Confirmar';

export default {
    name: 'Pagar',
    components: {
        Confirmar
    },
    data: function() {
        return {
            idmodal: "modalFormConfirmacion",
            sending: false,
            pago: {
                id: null,
                monto: 0,
                descripcion: null,
                session: null
            },
            errors: []
        }
    },
    methods: {
        onSubmit: function() {
            this.sending = true;
            let wallet = this.$store.getters.getWallet;
            Api.post('/pagar', {
                documento: wallet.documento,
                celular: wallet.celular,
                valor: this.pago.monto,
                descripcion: this.pago.descripcion
            })
            .then((resp) => {
                this.errors = [];
                this.pago = resp.data.data;
                window.$("#"+this.idmodal).modal('show');
            })
            .catch((error) => {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
            })
            .finally(() => {
                this.sending = false;
            });
        }
    }
}
</script>

<style>

</style>