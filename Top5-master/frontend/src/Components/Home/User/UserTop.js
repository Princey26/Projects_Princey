import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Image from "../../Images/defaultUser.png"
import Multiselect from 'multiselect-react-dropdown';
import option from "../../Login/Options";
import "../UserFile.css"

export default function UserTop() {
    const [redirect, setRedirect] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [categorySelect, setCategorySelect] = useState([]);
    const [selectedVal, setSelectedVal] = useState([]);
    // const [photselect , setPhotoselect] = useState("");
    const [newUser, setNewUser] = useState(
        {
            photo: '',
        }
    );
    let [parent_data, setParent_data] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    })
    const [data, Setdata] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        image: "",
        AboutMe: "",
        category: []
    });
    const formData = new FormData()
    // const selectedVal = data.category;
    let selectedValue = [];
    useEffect(() => {
        let token = sessionStorage.getItem("Token");
        if (token) {
            let array = [];
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            Setdata(userInfo)
            // setCategorySelect(userInfo.category)
            setParent_data(userInfo)
            // let selectedValue = [];
            // if(userInfo.category !== null && userInfo.category !== undefined)
            // userInfo.category.forEach(element => {
            //     selectedValue.push({ value: element, label: element });
            // });
            // setSelectedVal(userInfo.category)
        } else {
            setRedirect(true);
        }
    }, [])

    const eventInput = (event) => {
        const { name, value } = event.target;
        Setdata((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        })
    }

    const FindAns = () => {
        setIsOpen(true);
    }

    const SubmitReview = (e) => {
        e.preventDefault();

        if (!validator.isEmail(data.email)) {
            toast.error('Invalid Email', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (data.firstName.length === 0 || data.lastName.length === 0) {
            toast.error('Error in firstname or lasname', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (data.username.length === 0) {
            toast.error('Invalid username', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            // console.log(categorySelect)
            const update = {
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                AboutMe: data.AboutMe,
                category: categorySelect
            }
            // console.log(update);
            const token = sessionStorage.getItem('Token');
            fetch('http://localhost:8000/api/update_user', {
                method: 'PUT',
                headers: {
                    'x-auth-token': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(update)
            }).then(res => res.json())
                .then(res => {
                    // console.log(res)
                    toast.success("Updated sucessfully !", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    sessionStorage.setItem("userInfo", JSON.stringify(res.user))
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch(err => console.log(err));
        }


    }

    const Onclose = (e) => {
        setIsOpen(false);
        Setdata(parent_data);
    }
    const handlePhoto = (e) => {
        setNewUser({ photo: e.target.files[0] });
        // }
        // const handleSubmit = (e) =>{
        // e.preventDefault();
        formData.append('photo', e.target.files[0]);
        // let p = e.target.files[0];
        // console.log("something is tiggred")

        const token = sessionStorage.getItem('Token');
        // console.log(token);
        fetch('http://localhost:8000/api/update_image', {
            method: 'PATCH',
            headers: {
                'x-auth-token': token,
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            },
            // body: JSON.stringify(update)
            body: formData
        }).then(res => res.json())
            .then(res => {
                // console.log(res)
                toast.success("Updated sucessfully !", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                sessionStorage.setItem("userInfo", JSON.stringify(res.user))
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => console.log(err));
    }


    const animatedComponents = makeAnimated();

    // const animatedComponents = makeAnimated();
    // const onSelect = (selectedList, selectedItem) => {
    //     console.log(selectedList)
    //     setCategorySelect(selectedList);
    // }

    // const onRemove = (selectedList, removedItem) => {
    //     console.log(selectedList)
    //     setCategorySelect(selectedList);
    // }
    const ChangingVal = (value, val) => {
        console.log(value)
        let arr = []
        value.forEach(element => {
            arr.push(element.value)
        });
        console.log(arr)
        setCategorySelect(arr);
        // console.log(val)
    }
    return (
        <>
            


            <div class="_main-content">
                <nav
                    class="_navbar _navbar-top _navbar-expand-md _navbar-dark"
                    id="_navbar-main"
                >
                    <div class="_container-fluid">

                        <ul class="_navbar-nav _align-items-center _d-none _d-m_d-flex">
                            <li class="_nav-item _dropdown">
                                <div class="_dropdown-menu _dropdown-menu-ar_row _dropdown-menu-right">
                                    <div class=" _dropdown-_header _noti-title">
                                        <h6 class="_text-overflow _m-0">Welcome!</h6>
                                    </div>
                                    <a href="../examples/profile.html" class="_dropdown-item">
                                        <i class="ni ni-single-02"></i>
                                        <span>My profile</span>
                                    </a>
                                    <a href="../examples/profile.html" class="_dropdown-item">
                                        <i class="ni ni-settings-gear-65"></i>
                                        <span>Settings</span>
                                    </a>
                                    <a href="../examples/profile.html" class="_dropdown-item">
                                        <i class="ni ni-calendar-grid-58"></i>
                                        <span>Activity</span>
                                    </a>
                                    <a href="../examples/profile.html" class="_dropdown-item">
                                        <i class="ni ni-support-16"></i>
                                        <span>Support</span>
                                    </a>
                                    <div class="_dropdown-divider"></div>
                                    <a href="#!" class="_dropdown-item">
                                        <i class="ni ni-user-run"></i>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div
                    class="_header _pb-8 _pt-5 _pt-lg-8 _d-flex _align-items-center"
                    style={{
                        minHeight: "600px",
                        backgroundImage:
                            "url(https://raw.githack.com/creativetimofficial/argon-dashboard/master/assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;"
                    }}
                >
                    <span class="_mask _bg-gradient-default _opacity-8"></span>

                    <div class="_container-fluid _d-flex _align-items-center">
                        <div class="_row">
                            <div class="_col-lg-7 _col-md-10">
                                <h1 class="_display-2 _text-white">Hello {data.firstName + " " + data.lastName}</h1>
                                <p class="_text-white _mt-0 _mb-5">
                                    This is your profile page. You can see the progress you've made
                                    with your work and manage your projects or assigned tasks
                                </p>
                                {/* <a href="#!" class="_btn _btn-info">
                                    Edit profile
                                </a> */}
                                <button data-toggle="modal" className="_btn _btn-info" data-target="#exampleModalCenter" onClick={() => { FindAns() }}>
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="_container-fluid mt--7">
                    <div class="_row">
                        <div class="_col-xl-4 _order-xl-2 _mb-5 _mb-xl-0">
                            <div class="_card _card-profile _shadow">
                                <div class="_row justify-content-center">
                                    <div class="col-lg-3 order-lg-2">
                                        {/* <div class="_card-profile-image">
                                            
                                            <img src={data.image && data.image.length !== 0 ? 'http://localhost:8000/images/' + data.image : Image} alt="" />
                                            
                                            <div class="file btn btn-lg btn-primary">
                                                Change Photo
                                                <input
                                                    type="file"
                                                    accept=".png, .jpg, .jpeg"
                                                    onChange={handlePhoto}
                                                    name="file" />
                                            </div>
                                        </div> */}
                                        <div class="profile-img">
                                            <img src={data.image && data.image.length !== 0 ? 'http://localhost:8000/images/' + data.image : Image} alt="" />

                                            {/* <div class="file btn btn-lg btn-primary">
                                                Change Photo
                                                <input
                                                    type="file"
                                                    accept=".png, .jpg, .jpeg"
                                                    onChange={handlePhoto}
                                                    name="file" />
                                            </div> */}


                                        </div>
                                    </div>
                                </div>
                                <div class="_card-header _text-center _border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div class="_d-flex justify-content-between">
                                        <a href="#" class="_btn _btn-sm _btn-info mr-4">
                                            Connect
                                        </a>
                                        <a href="#" class="_btn _btn-sm _btn-default float-right">
                                            Message
                                        </a>
                                    </div>
                                </div>
                                <div class="_card-body pt-0 pt-md-4">
                                    <div class="_row">
                                        <div class="col">
                                            <div class="_card-profile-stats _d-flex justify-content-center mt-md-5">
                                                <div>
                                                    <span class="heading">22</span>
                                                    <span class="description">Friends</span>
                                                </div>
                                                <div>
                                                    <span class="heading">10</span>
                                                    <span class="description">Photos</span>
                                                </div>
                                                <div>
                                                    <span class="heading">89</span>
                                                    <span class="description">Comments</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="_text-center">
                                        <h3>
                                            Jessica Jones<span class="font-weight-light">, 27</span>
                                        </h3>
                                        <div class="h5 font-weight-300">
                                            <i class="ni location_pin mr-2"></i>Bucharest, Romania
                                        </div>
                                        <div class="h5 mt-4">
                                            <i class="ni business_briefcase-24 mr-2"></i>Solution
                                            Manager - Creative Tim Officer
                                        </div>
                                        <div>
                                            <i class="ni education_hat mr-2"></i>University of Computer
                                            Science
                                        </div>
                                        <hr class="my-4" />
                                        <p>
                                            Ryan — the name taken by Melbourne-raised, Brooklyn-based
                                            Nick Murphy — writes, performs and records all of his own
                                            music.
                                        </p>
                                        <a href="#">Show more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8 order-xl-1">
                            <div class="_card bg-secondary _shadow">
                                <div class="_card-_header _bg-white _border-0">
                                    <div class="_row _align-items-center">
                                        <div class="col-8">
                                            <h3 class="_mb-0">My account</h3>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="_card-body">
                                    <form>
                                        <h6 class="_heading-small _text-muted mb-4">
                                            User information
                                        </h6>
                                        <div class="pl-lg-4">
                                            <div class="_row">
                                                <div class="col-lg-6">
                                                    <div class="_form-group focused">
                                                        <label
                                                            class="_form-control-label"
                                                            for="input-username"
                                                        >
                                                            Username
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input-username"
                                                            class="_form-control _form-control-alternative"
                                                            placeholder="Username"
                                                            value={data.username}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="_form-group">
                                                        <label class="_form-control-label" for="input-email">
                                                            Email address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="input-email"
                                                            class="_form-control _form-control-alternative"
                                                            placeholder="jesse@example.com"
                                                            value={data.email}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="_row">
                                                <div class="col-lg-6">
                                                    <div class="_form-group focused">
                                                        <label
                                                            class="_form-control-label"
                                                            for="input-first-name"
                                                        >
                                                            First name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input-first-name"
                                                            class="_form-control _form-control-alternative"
                                                            placeholder="First name"
                                                            value={data.firstName}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="_form-group focused">
                                                        <label
                                                            class="_form-control-label"
                                                            for="input-last-name"
                                                        >
                                                            Last name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="input-last-name"
                                                            class="_form-control _form-control-alternative"
                                                            placeholder="Last name"
                                                            value={data.lastName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr class="my-4" />

                                        <h6 class="_heading-small _text-muted mb-4">
                                            More Info
                                        </h6>
                                        <div class="pl-lg-4">
                                            <div class="_row">
                                                <div class="col-md-12">
                                                    <div class="_form-group focused">
                                                        <label class="_form-control-label" for="input-address">
                                                            Category Lover
                                                        </label>
                                                        <input
                                                            id="input-address"
                                                            class="_form-control _form-control-alternative"
                                                            placeholder="Home Address"
                                                            value={
                                                                data.category
                                                            }
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* </div> */}
                                        </div>
                                        <hr class="my-4" />

                                        <h6 class="_heading-small _text-muted mb-4">About me</h6>
                                        <div class="pl-lg-4">
                                            <div class="_form-group focused">
                                                <label>About Me</label>
                                                <textarea
                                                    _rows="4"
                                                    class="_form-control _form-control-alternative"
                                                    placeholder="A few words about you ..."
                                                    value={data.AboutMe}
                                                >

                                                </textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                isOpen &&
                <div>
                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Profile</h5>

                                    <button onClick={Onclose} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={SubmitReview}>
                                    <div class="modal-body">
                                        <div class="floating-label">
                                            <input
                                                type="text"
                                                placeholder="Enter firstname" name="firstName"
                                                value={data.firstName}
                                                className="input"
                                                onChange={eventInput}
                                                autocomplete="off" />
                                            <label for="password">First Name:</label>
                                        </div>
                                        <div class="floating-label">
                                            <input
                                                type="text"
                                                placeholder="Enter lastname" name="lastName"
                                                value={data.lastName}
                                                onChange={eventInput}
                                                className="input"
                                                autocomplete="off" />
                                            <label for="password">Last Name:</label>
                                        </div>
                                        <div class="floating-label">
                                            <input
                                                type="text"
                                                placeholder="Enter username" name="username"
                                                value={data.username}
                                                onChange={eventInput}
                                                className="input"
                                                autocomplete="off" />
                                            <label for="username">UserName</label>
                                        </div>
                                        <div class="floating-label">
                                            <input
                                                type="email"
                                                placeholder="Enter Email"
                                                name="email"
                                                className="input"
                                                value={data.email}
                                                onChange={eventInput}
                                                autocomplete="off" />
                                            <label for="email">Email:</label>
                                        </div>
                                        <div className="">
                                            {/* <Multiselect
                                                isObject={false}
                                                options={option}
                                                selectedValues={selectedValue}
                                                onSelect={onSelect}
                                                onRemove={(selectedList, selectedValue) => { onRemove(selectedList, selectedValue) }}
                                                selectionLimit={6}
                                                displayValue="name"
                                                placeholder="Select Type you like"
                                            /> */}




                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                defaultValue={selectedVal}
                                                isMulti
                                                options={option}
                                                onChange={ChangingVal}
                                            // isObject={false}
                                            />

                                            <label for="Category">Category:</label>

                                        </div>
                                        <div class="floating-label">
                                            <textarea
                                                type="text"
                                                placeholder="About Me"
                                                name="AboutMe"
                                                className="input"
                                                rows={6}
                                                value={data.AboutMe}
                                                onChange={eventInput}
                                                autocomplete="off" />
                                            <label for="email">AboutMe:</label>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button onClick={Onclose} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            }
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}