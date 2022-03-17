<template>
<div class="container">
        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."
                                                v-model="form.email" autocomplete="email">
                                            <p class="text-danger" v-text="errors.email"></p>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password"
                                                v-model="form.password" autocomplete="current-password">
                                            <p class="text-danger" v-text="errors.password"></p>
                                        </div>

                                        <a href="#" @click.prevent="loginUser" class="btn btn-primary btn-user btn-block">
                                            Login
                                        </a>

                                    </form>
                                    <hr>
                                    <div class="text-center">
                                        <router-link to='/register' class="small">Create an Account!</router-link>
                                    </div>
                                </div>
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
                title: 'Login',
                form: {
                    email: '',
                    password: ''
                },
                errors: {}
            }
        },
        methods: {
            async loginUser() {
                await axios.get('/sanctum/csrf-cookie').then(response => {
                    axios.post('/api/login', this.form).then(response => {
                        localStorage.setItem('token', response.data.token)
                        this.form.email = this.form.password = ''
                        this.errors = {}
                        this.$router.push({ name: "Dashboard"}); 
                    }).catch((errors) =>{
                        this.form.password = ''
                        this.errors = errors.response.data.errors;
                    });
                });
            }
        }
    }
</script>