import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePostjbMutation } from '../features/auth/authApi';
import { toast } from 'react-toastify';

const Postjb = () => {
  const navigate = useNavigate();
  const [postjb, { isLoading }] = usePostjbMutation();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    role: '',
    type: 'full time',
    duration: '',
    description: '',
    requirement: '',
    category: "marketing",
    logo: null,
    last_date: '',
    vacancy: '',
    stip: ''
  });

  const [error, setError] = useState('');
  const [ip, setIp] = useState("");
  const [p, setP] = useState("");
  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (ip==="") {
    toast.error("Please fill all details");
    return;
    }
     if (p==="") {
    toast.error("Please fill all details");
    return;
  }
    try {

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "description") {
          data.append(key, ip);
        }
        else if (key === "requirement") {
          data.append(key, p);
        }
        else {
          console.log(key, value);
          data.append(key, value);
        }

      });
      const resp = await postjb(data).unwrap();
      console.log(resp);
      navigate('/', { state: { message: "Posted successfully" } });
    } catch (err) {
      const message = err?.data?.message || 'add failed';
      setError(message);
      toast.error(message);
    }
  };
  const formatText = (cd, value = null) => {
    document.execCommand(cd, false, value);
  }

  const handleInput = (e) => {
    setIp(e.target.innerHTML);
    console.log(ip);
  }
  const hndleInput = (e) => {
    setP(e.target.innerHTML);

  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Post Job</h3>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <div className="toolbar">
                    <button type="button" onClick={() => formatText("bold")}><b>B</b></button>
                    <button type="button" onClick={() => formatText("italic")}><i>I</i></button>
                    <button type="button" onClick={() => formatText("insertUnorderedList")}>• List</button>
                  </div>

                  <div
                    className="editor"
                    contentEditable
                    onInput={handleInput}
                    style={{ border: "1px solid #ccc", minHeight: "150px", padding: "10px" }}
                  required></div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    name="role"
                    className="form-control"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stipend</label>
                  <input
                    type="text"
                    name="stip"

                    className="form-control"
                    value={formData.stip}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select name='type' className="form-select" value={formData.type} onChange={handleChange}>
                    <option value='full time'>Full time</option>
                    <option value='part time'>Part time</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    className="form-control"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vacancy</label>
                  <input
                    type="number"
                    name="vacancy"
                    className="form-control"
                    value={formData.vacancy}
                    onChange={handleChange}
                    defaultValue={1}
                    min={1}
                    required
                  />
                </div>


                <div className="mb-3">
                  <label className="form-label">Requirement(s)</label>
                  <div className="toolbar">
                    <button type="button" onClick={() => formatText("bold")}><b>B</b></button>
                    <button type="button" onClick={() => formatText("italic")}><i>I</i></button>
                    <button type="button" onClick={() => formatText("insertUnorderedList")}>• List</button>
                  </div>
                  <div
                    className="editor"
                    contentEditable
                    onInput={hndleInput}
                    style={{ border: "1px solid #ccc", minHeight: "150px", padding: "10px" }}
                 required ></div>

                </div>
                <div className="mb-3">
                  <label className="form-label">Choose Category</label>
                  <select name='category' className="form-select" value={formData.category} onChange={handleChange}>
                    <option value='marketing'>Marketing</option>
                    <option value='Customer Service'>Customer service</option>
                    <option value='Project Management'>Project management</option>
                    <option value='Web Development'>Web development</option>
                    <option value='Frontend Development'>Frontend development</option>
                    <option value='Backend Development'>Backend development</option>
                    <option value='Education'>Education</option>
                    <option value='Graphic Design'>Graphic Design</option> 
                    <option value='Software Development'>Software Development</option>
                    <option value='Data Science'>Data Science</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Last date</label>
                  <input
                    type="date"
                    name="last_date"
                    className="form-control"
                    value={formData.last_date}
                    onChange={handleChange}

                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">logo</label>
                  <input
                    type="file"
                    name="logo"
                    className="form-control"
                    accept='.png,.jpg'
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Submitting...
                    </>
                  ) : (
                    'Post'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Postjb
