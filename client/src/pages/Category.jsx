import { useNavigate } from 'react-router-dom';
import { useCardQuery, useCatnameMutation, useCdQuery, useCheckSessionQuery } from '../features/auth/authApi';
import { setCategory } from '../features/job/jobSlice';
import { useDispatch } from 'react-redux';



const Category = () => {
  const { data } = useCheckSessionQuery();
  const { data: cdDt } = useCdQuery();

  let categy;
  console.log("category");
  console.log(data);

  const { data: a } = useCardQuery();

  if (data) {
     
    categy = a?.reduce((ar, post) => {
      let i = ar.find(elet => elet.category === post.category);
      console.log(i);
      if (i) {
        i.coun++;
      }
      else {
        ar.push({ category: post.category, coun: 1 });
      }

      return ar;
    }, []);
  }
  else {
    console.log("d");
    categy = (cdDt??[]).reduce((ar, post) => {
      let i = ar.find(elet => elet.category === post.category);
      console.log(i);
      if (i) {
        i.coun++;
      }
      else {
        ar.push({ category: post.category, coun: 1 });
      }

      return ar;
    }, []);
    console.log(typeof (categy));
  }


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categ] = useCatnameMutation();
  console.log(categy);

  const pcategory = async (catname) => {
    console.log(catname);
    const res = await categ({ category: catname }).unwrap();
    console.log("category");
    console.log(typeof res);
    console.log(res);
    dispatch(setCategory(res));
    localStorage.setItem("category", JSON.stringify(res));
    navigate("/list");
  }
  return (
    <>
      <div className="container mt-5 w-75" style={{marginBottom:"280px"}}>
        <h4 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Explore By Category</h4>
        <div className="row g-4">
          {data?categy && (categy.length != 0) ? categy?.map((categry, index) => (
            <div className="col-lg-3 col-sm-6 wow fadeInUp  " onClick={() => data ? pcategory(categry.category) : navigate('/login')} data-wow-delay={categry.delay} key={index}>
    
                {/* <i className={`fa fa-3x ${category.icon} text-primary mb-4`}></i> */}
                <div
                      className="category-card p-4 rounded text-center"
                      style={{
                        background: "#ffffff",
                        border: "1px solid #eee",
                        borderRadius: "18px",
                        transition: "all 0.3s ease",
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0px 8px 25px rgba(0,0,0,0.10)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0,0,0,0.05)";
                      }}
                    >
                      {/* Icon Container */}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "rgba(0, 123, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px auto",
                        }}
                      >
                        <i className="fa fa-briefcase text-primary fa-lg"></i>
                        {/* You can dynamically set icon if available */}
                      </div>

                <h6 className="mb-3">{categry.category}</h6>
                <p className="mb-0">{categry.coun} job available</p>
              </div>
            </div>
            
          )) :<p className="text-center fs-4 text-capitalize">not found any category</p>
          :categy?.map((categry, index) => (
            <div className="col-lg-3 col-sm-6 wow fadeInUp  " onClick={() => data ? pcategory(categry.category) : navigate('/login')} data-wow-delay={categry.delay} key={index}>
               
                {/* <i className={`fa fa-3x ${category.icon} text-primary mb-4`}></i> */}
                <div
                      className="category-card p-4 rounded text-center"
                      style={{
                        background: "#ffffff",
                        border: "1px solid #eee",
                        borderRadius: "18px",
                        transition: "all 0.3s ease",
                        boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow = "0px 8px 25px rgba(0,0,0,0.10)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0,0,0,0.05)";
                      }}
                    >
                      {/* Icon Container */}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          background: "rgba(0, 123, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px auto",
                        }}
                      >
                        <i className="fa fa-briefcase text-primary fa-lg"></i>
                        {/* You can dynamically set icon if available */}
                      </div>

                <h6 className="mb-3">{categry.category}</h6>
                <p className="mb-0">{categry.coun} post</p>
              </div>
            </div>))}
        </div>
      </div>
    </>
  );
};

export default Category;