<template>
    <div class="modal fade" v-bind:id="idmodal" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmacion de pago</h5>
                </div>
                <form v-on:submit.prevent="onSubmit">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="tokenConfirmacionInput"><i class="fas fa-hashtag"></i> Token de Verificacion</label>
                            <input type="text" class="form-control" id="tokenConfirmacionInput" aria-describedby="celularHelp" required v-model="token">
                            <small id="tokenConfirmacionHelp" class="form-text text-muted">Ingrese el token enviado a su correo</small>
                        </div>
                        <div v-if="successfull">
                            <div class="alert alert-success" role="alert">
                                <i class="fas fa-check-circle"></i> Su pago se realizo con exito.
                            </div>
                        </div>
                        <div v-for="error in errors" v-bind:key="error">
                            <div class="alert alert-danger" role="alert">
                                <i class="fas fa-info-circle"></i> {{ error }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary" v-bind:disabled="sending"><i v-if="sending" class="fas fa-spinner fa-spin"></i> Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../services/api';

export default {
    name: 'Confirmar',
    props: ['idmodal', 'session'],
    data: function() {
        return {
            sending: false,
            successfull: false,
            token: null,
            errors: []
        };
    },
    methods: {
        onSubmit: function() {
            this.sending = true;
            this.successfull = false;
            Api.post('/confirmar-pago', {
                token: this.token,
                session: this.session
            })
            .then((resp) => {
                let data = resp.data.data;
                this.errors = [];
                this.token = null;
                this.successfull = true;
                this.$store.commit('setSaldo', data.saldo);
                setInterval(() => {
                    window.$("#"+this.idmodal).modal('hide');
                    this.successfull = false;
                }, 3000);
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
