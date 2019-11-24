import React from 'react';
import img2 from '../../../assets/CEO2.png'
import img3 from '../../../assets/CEO2.png'
import img5 from '../../../assets/testimonial.png';

const Testimonials =()=>{
    return(
        <div>
              <div className="testimonial-images">
                                    <div className="testimonial-down">
                                        <img src={img3} alt="testimonial" />
                                    </div>
                                    <div className="testimonial-up">
                                        <img src={img2} alt="testimonial" />
                                    </div>
                                    <div className="testimonial-down">
                                        <img src={img5} alt="testimonial" />
                                    </div>
                                    <div className="testimonial-up">
                                        <img src={img2} alt="testimonial" />
                                    </div>
                                    <div className="testimonial-down">
                                        <img src={img5} alt="testimonial" />
                                    </div>
                                    <div className="testimonial-up">
                                        <img src={img2} alt="testimonial" />
                                    </div>
                                    <div className="testimonial-down">
                                        <img src={img5} alt="testimonial" />
                                    </div>
                                    <div className="testimonial-up">
                                        <img src={img5} alt="testimonial" />
                                    </div>
                                    
                                </div> 
        </div>
    )
}

export default Testimonials;