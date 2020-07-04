<template>
    <div class="row justify-content-md-center">
        <div class="card col-sm-auto">
            <div class="card-body">
                <h2 class="card-title text-center"><i class="fas fa-wallet"></i> Billetera</h2>
                <form v-on:submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="documentoInput"><i class="fas fa-id-card"></i> Documento</label>
                        <input type="text" class="form-control" minlength="4" maxlength="100" id="documentoInput" aria-describedby="documentoHelp" required v-model="cliente.documento">
                        <small id="documentoHelp" class="form-text text-muted">Ingrese su documento de identidad con el cual podra realizar sus operaciones.</small>
                    </div>
                    <div class="form-group">
                        <label for="nombresInput"><i class="fas fa-user-circle"></i> Nombre Completo</label>
                        <input type="text" class="form-control" minlength="4" maxlength="100" id="nombresInput" required v-model="cliente.nombres">
                    </div>
                    <div class="form-group">
                        <label for="emailInput"><i class="fas fa-envelope"></i> Correo Electronico</label>
                        <input type="email" class="form-control" id="emailInput" aria-describedby="emailHelp" required v-model="cliente.email">
                        <small id="emailHelp" class="form-text text-muted">Ingrese un correo electronico valido ya que se usara para confirmar sus pagos.</small>
                    </div>
                    <div class="form-group">
                        <label for="celularInput"><i class="fas fa-mobile-alt"></i> Celular</label>
                        <input type="text" class="form-control" id="celularInput" aria-describedby="celularHelp" required pattern="\d{10,11}" v-model="cliente.celular">
                        <small id="celularHelp" class="form-text text-muted">Solo numeros, entre 10 y 11 digitos</small>
                    </div>
                    <button type="submit" v-bind:disabled="sending" class="btn btn-primary btn-block btn-lg">
                        <i v-if="sending" class="fas fa-spinner fa-spin"></i> Crear Billetera
                    </button>
                    <br>
                    <div v-for="error in errors" v-bind:key="error">
                        <div class="alert alert-danger" role="alert">
                            <i class="fas fa-info-circle"></i> {{ error }}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Api from "../services/api";

export default {
    name: 'Registro',
    data: function() {
        return {
            sending: false,
            errors: [],
            cliente: {
                documento: null,
                nombres: null,
                email: null,
                celular: null,
            }
        };
    },
    methods: {
        onSubmit: function() {
            this.sending = true;
            Api.post('/registro', this.cliente)
                .then(resp => {
                    this.$store.commit('setWallet', resp.data.data);
                    this.$router.push('/');
                })
                .catch(error => {
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