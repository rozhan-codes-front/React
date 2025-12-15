import "./App.css";
import {React, useState} from "react";

function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [gender, setGender] = useState("female");
    const [subjects, setSubjects] = useState({
        english: true,
        maths: false,
        physics: false,
    });
    const [resume, setResume] = useState("");
    const [url, setUrl] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [about, setAbout] = useState("");
    const [errors, setErrors] = useState({}); // <-- NEW

    const handleSubmit = (e) => {
        e.preventDefault();

        // Collect errors
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "First name is required";
        if (!lastName.trim()) newErrors.lastName = "Last name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!contact.trim()) newErrors.contact = "Contact number is required";
        if (!resume) newErrors.resume = "Please upload your resume";
        if (!url.trim()) newErrors.url = "URL is required";
        if (!selectedOption) newErrors.selectedOption = "Please select an option";
        if (!about.trim()) newErrors.about = "Please write something about yourself";

        setErrors(newErrors);

        // Stop submission if errors exist
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Otherwise proceed
        console.log(
            firstName,
            lastName,
            email,
            contact,
            gender,
            selectedOption,
            subjects,
            resume,
            url,
            about
        );

        alert("Form submitted successfully!");
    };

    const handleSubjectChange = (sub) => {
        setSubjects((prev) => ({
            ...prev,
            [sub]: !prev[sub],
        }));
    };

    const handleReset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setContact("");
        setGender("male");
        setSubjects({
            english: true,
            maths: false,
            physics: false,
        });
        setResume("");
        setUrl("");
        setSelectedOption("");
        setAbout("");
        setErrors({});
    };

    return (
        <div className="App">
            <h1>Form in React</h1>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstname">First Name*</label>
                    <input
                        type="text"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}

                    <label htmlFor="lastname">Last Name*</label>
                    <input
                        type="text"
                        id="lastname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}

                    <label htmlFor="email">Email*</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label htmlFor="contact">Contact*</label>
                    <input
                        type="tel"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                    {errors.contact && <p className="error">{errors.contact}</p>}
                    <label htmlFor="gender">Gender*</label>
                    <input type="radio" name="gender" value="male" id="male"
                           checked={gender === "male"}
                           onChange={(e) => setGender(e.target.value)}/>
                    <span> Male </span>
                    <input type="radio" name="gender" value="female" id="female"
                           checked={gender === "female"}
                           onChange={(e) => setGender(e.target.value)}/>
                    <span> Female </span>
                    <input type="radio" name="gender" value="other" id="other" checked={gender === "other"}
                           onChange={(e) => setGender(e.target.value)}/>
                    <span> Other </span>
                    <label htmlFor="lang"> Your best Subject </label>
                    <input type="checkbox" name="lang" id="english"
                           checked={subjects.english === true}
                           onChange={(e) => handleSubjectChange("english")}/>
                    <span> English </span>
                    <input type="checkbox" name="lang" id="maths"
                           checked={subjects.maths === true}
                           onChange={(e) => handleSubjectChange("maths")}/>
                    <span> Maths </span>
                    <input type="checkbox" name="lang" id="physics" checked={subjects.physics === true}
                           onChange={(e) => handleSubjectChange("physics")}/>
                    <span> Physics </span>
                    <label htmlFor="file">Upload Resume*</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setResume(e.target.files[0])}
                    />
                    {errors.resume && <p className="error">{errors.resume}</p>}

                    <label htmlFor="url">Enter URL*</label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    {errors.url && <p className="error">{errors.url}</p>}

                    <label>Select your choice</label>
                    <select name="select" id="select" value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}>
                    <option value="" disabled selected={selectedOption === ""}> Select your Ans</option>
                    <optgroup label="Beginers">
                        <option value="1">HTML</option>
                        <option value="2">CSS</option>
                        <option value="3"> JavaScript</option>
                    </optgroup>
                    <optgroup label="Advance">
                        <option value="4">React</option>
                        <option value="5">Node</option>
                        <option value="6"> Express</option>
                        <option value="t"> MongoDB</option>
                    </optgroup>
                </select>
                    {errors.selectedOption && (
                        <p className="error">{errors.selectedOption}</p>
                    )}

                    <label htmlFor="about">About*</label>
                    <textarea
                        id="about"
                        cols="30"
                        rows="5"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                    {errors.about && <p className="error">{errors.about}</p>}

                    <button type="reset" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit">Submit</button>
                </form>
            </fieldset>
        </div>
    );
}

export default App;
