<template>
    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Task list</div>
            </a>
        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">
                        
                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ cUser.name }}</span>
                                <img class="img-profile rounded-circle"
                                    src="admin/img/undraw_profile.svg">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                
                                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Content Row -->
                    <div class="row">
                        <!-- Taken progress Example -->
                        <div class="col mb-4">
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Done
                                            </div>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ pcDone }}%</div>
                                                </div>
                                                <div class="col">
                                                    <div class="progress progress-sm mr-2">
                                                        <div class="progress-bar bg-info" role="progressbar"
                                                            v-bind:style="{ width: pcDone + '%' }"
                                                            aria-valuenow="{{ pcDone }}" aria-valuemin="0"
                                                            aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Content Row -->
                    <div class="row">

                        <!-- Content Column -->
                        <div class="col-lg-6 mb-4">

                            <!-- Project Card Example -->
                            <div class="card shadow mb-4">
                                
                                <a href="#collapseCardExample" 
                                        class="d-block card-header py-3" data-toggle="collapse"
                                            role="button" aria-expanded="true" aria-controls="collapseCardExample">
                                            <h6 class="m-0 font-weight-bold text-primary">Add a new task</h6>
                                        </a>

                                <div class="collapse show" id="collapseCardExample">
                                    <div class="card-body">
                                        <form @submit.prevent="onSubmit">
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-user" id="titel"
                                                    placeholder="Title *"
                                                    v-model="titel">
                                            </div>
                                            <div class="form-group">
                                                <textarea id="beschrijving" 
                                                    class="form-control form-control-user" 
                                                    v-model="beschrijving" placeholder="Description"></textarea>
                                            </div>

                                            <button class="btn btn-primary btn-icon-split"
                                                :disabled="!okForm"
                                                :class="{ disabledButton: !okForm }"
                                            >
                                                <span class="icon text-white-50">
                                                    <i class="fas fa-flag"></i>
                                                </span>
                                                <span class="text">Add task</span>
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-6 mb-4">
                            <!-- Loading -->
                            <div v-if="laden">
                                <div class="card bg-info text-white shadow">
                                    <div class="card-body">
                                        Loading please wait ...
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <!-- Geen taken -->
                                <div v-if="taken.length==0">
                                    
                                    <div class="card bg-warning text-white shadow">
                                        <div class="card-body">
                                            No tasks found
                                        </div>
                                    </div>
                                </div>
                                <div v-else>

                                    <!-- Collapsable Card Example -->
                                    <div v-for="(taak, index) in taken" :key="taak.id" 
                                        :class="{ taakdone: taak.gedaan }"
                                        class="card shadow mb-4">
                                        <!-- Card Header - Accordion -->
                                        <a :href="'#collapseCardExample'+index" 
                                        class="d-block card-header py-3" data-toggle="collapse"
                                            role="button" aria-expanded="true" :aria-controls="'collapseCardExample'+index">
                                            <h6 class="m-0 font-weight-bold text-primary" :class="{ done: taak.gedaan }" >{{ taak.titel+'.'+index }}</h6>
                                        </a>
                                        <!-- Card Content - Collapse -->
                                        <div class="collapse show" :id="'collapseCardExample' + index">
                                            <div class="ml-4 mt-2" v-if="taak.beschrijving">
                                                <p class="taak" :class="{ done: taak.gedaan }">
                                                    <i>{{ taak.beschrijving }}</i>
                                                </p>
                                            </div>
                                            <div class="form-group ml-4 mt-3">
                                                <a v-if="!taak.gedaan" @click="veranderStatus(taak)"
                                                    href="#" class="btn btn-success btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-check"></i>
                                                    </span>
                                                    <span class="text">Mark as done</span>
                                                </a>
                                                <a v-else @click="veranderStatus(taak)"
                                                    href="#" class="btn btn-secondary btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-arrow-right"></i>
                                                    </span>
                                                    <span class="text">Mark as todo</span>
                                                </a>
                                                &#96;
                                                <a href="#" @click="verwijderTaak(index, taak.id)"
                                                class="btn btn-danger btn-icon-split">
                                                    <span class="icon text-white-50">
                                                        <i class="fas fa-trash"></i>
                                                    </span>
                                                    <span class="text">Delete</span>
                                                </a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2022</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="#" @click="logout">Logout</a>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Dashboard',
                taken: [],
                errors: [],
                cUser: {},
                token: localStorage.getItem('token'),
                titel: '',
                beschrijving: '',
                laden: true
            }
        },
        methods: {
            async logout() {
                await axios.get('/api/logout').then(response => {
                    localStorage.removeItem('token')
                    window.location.href = "/";
                }).catch((errors) =>{
                    this.errors = errors.response.data.errors;
                });
            }, async getTasks(userId) {
                this.laden = true;
                await axios.get('/api/tasks/search/'+userId).then(response => {
                    this.taken = response.data;
                });
                this.laden = false;
            }, async onSubmit() {
                const taak = {
                    user_id: this.cUser.id,
                    titel: this.titel.trim(),
                    beschrijving: this.beschrijving.trim() === "" ? null : this.beschrijving.trim(),
                    gedaan: false
                }
                await axios.post('/api/tasks',taak).then(response => {
                    this.getTasks(this.cUser.id);
                    this.titel = ''
                    this.beschrijving = ''
                    document.getElementById("titel").focus()
                });
            }, async veranderStatus(taak) {
                await axios.put('/api/tasks/'+taak.id,{ gedaan: !taak.gedaan}).then(response => {
                    taak.gedaan = !taak.gedaan
                });
            }, async verwijderTaak(index, id) {
                let text = "Are you sure you want to delete this task?";
                if (confirm(text) == true) {
                    await axios.delete('/api/tasks/'+id).then(response => {
                        this.getTasks(this.cUser.id);
                    });
                }
            }
        },
        computed: {
            okForm() {
                return this.titel.trim() !== ''
            },
            pcDone() {
                return this.taken.length === 0 ? 0 : Math.round(this.taken.filter(taak => { return taak.gedaan }).length / this.taken.length * 100)
            }
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+this.token;
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            axios.get('/api/user').then(response => {
                this.cUser = response.data;
                this.getTasks(this.cUser.id);
            }).catch((errors) =>{
                this.errors = errors.response.data.errors;
            });
        }
    }
</script>