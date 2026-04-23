import React from 'react'

const Testimonial = () => {
  return (
    <>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <h1 className="text-center mb-5">Our Clients Say!!!</h1>
        <div className="row g-4">
          {[
            {
              text: 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam',
              name: 'Client Name',
              profession: 'Profession',
              image: 'img/testimonial-1.jpg',
            },
            {
              text: 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam',
              name: 'Client Name',
              profession: 'Profession',
              image: 'img/testimonial-2.jpg',
            },
            {
              text: 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam',
              name: 'Client Name',
              profession: 'Profession',
              image: 'img/testimonial-3.jpg',
            },
            {
              text: 'Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet eirmod eos labore diam',
              name: 'Client Name',
              profession: 'Profession',
              image: 'img/testimonial-4.jpg',
            },
          ].map((testimonial, index) => (
            <div key={index} className="col-lg-6">
              <div className="testimonial-item bg-light rounded p-4 h-100">
                <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                <p>{testimonial.text}</p>
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid flex-shrink-0 rounded"
                    src={testimonial.image}
                    alt=""
                    style={{ width: '50px', height: '50px' }}
                  />
                  <div className="ps-3">
                    <h5 className="mb-1">{testimonial.name}</h5>
                    <small>{testimonial.profession}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      
      
    </>
  )
}

export default Testimonial
