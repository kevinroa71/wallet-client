<template>
    <div class="card">
        <div class="card-body">
            <h2 class="card-title">
                <i class="fas fa-calculator"></i> Regargar
            </h2>
            <form v-on:submit.prevent="onSubmit">
                <div class="form-group">
                    <label for="montoRecargaInput"><i class="fas fa-dollar-sign"></i> Monto</label>
                    <input type="number" class="form-control" id="montoRecargaInput" required v-model.number="monto" min="1" step="0.01">
                </div>
                <button type="submit" v-bind:disabled="sending" class="btn btn-primary btn-block btn-lg">
                    <i v-if="sending" class="fas fa-spinner fa-spin"></i> Recargar
                </button>
                <br>
                <div v-if="successfull">
                    <div class="alert alert-success" role="alert">
                        <i class="fas fa-check-circle"></i> La recarga se realizo con exito.
                    </div>
                </div>
                <div v-for="error in errors" v-bind:key="error">
                    <div class="alert alert-danger" role="alert">
                        <i class="fas fa-info-circle"></i> {{ error }}
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Api from '../services/api';

export default {
    name: 'Recargar',
    data: function() {
        return {
            sending: false,
            successfull: false,
            monto: 0,
            errors: []
        }
    },
    methods: {
        onSubmit: function() {
            this.sending = true;
            this.successfull = false;
            let wallet = this.$store.getters.getWallet;
            Api.put('/recargar', {
                documento: wallet.documento,
                celular: wallet.celular,
                valor: this.monto
            })
            .then((resp) => {
                this.$store.commit('setSaldo', resp.data.data.saldo);
                this.errors = [];
                this.successfull = true;
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