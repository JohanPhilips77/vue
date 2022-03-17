<template>
    <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form class="user">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-user" id="exampleName"
                                        placeholder="Name"
                                        v-model="form.name" autocomplete="name">
                                    <p class="text-danger" v-text="errors.name"></p>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address"
                                        v-model="form.email" autocomplete="email">
                                    <p class="text-danger" v-text="errors.email"></p>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password"
                                            v-model="form.password" autocomplete="new-password">
                                        <p class="text-danger" v-text="errors.password"></p>
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password"
                                            v-model="form.password_confirmation" autocomplete="new-password">
                                        <p class="text-danger" v-text="errors.password_confirmation"></p>
                                    </div>
                                </div>
                                <a href="#" @click.prevent="saveForm" class="btn btn-primary btn-user btn-block">
                                    Register Account
                                </a>
                            </form>
                            <hr>
                            <div class="text-center">
                                <router-link class="small" to='/login'>Already have an account? Login!</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Register',
                form:{
                    name: '',
                    email: '',
                    password:'',
                    password_confirmation:''
                },
                errors: {}
            }
        },
        methods:{
            saveForm(){
                console.log('SaveForm')       
                axios.post('/api/register', this.form).then((response) =>{
                    console.log(response.data);
                    this.form.name = this.form.email = this.form.password = this.form.password_confirmation = ''
                    this.errors = {}
                    this.$router.push('/login')
                }).catch((errors) =>{
                    console.log(errors.response.data.errors);
                    this.errors = errors.response.data.errors;
                })     
            }
        }
    }
</script>