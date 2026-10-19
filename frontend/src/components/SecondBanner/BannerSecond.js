import React from 'react'
import { FaRegHandPointer
} from 'react-icons/fa';

import { GiBookmarklet } from 'react-icons/gi'
import {PiCertificate  } from 'react-icons/pi'
import {BsCashCoin } from 'react-icons/bs'
import { HiLightBulb,HiDesktopComputer } from 'react-icons/hi'
import { LiaCertificateSolid} from 'react-icons/lia'
import { MdReportProblem } from 'react-icons/md'

import './BannerSecond.css'
function BannerSecond() {
  return (
    <div className='container pt-5' >
        <div>
            <h1>Why are we best than the others?</h1>
        </div>
        <div className='row d-flex justify-content-center' style={{marginTop:'4rem',paddingTop:'20px'}}>
            <div className='col-2  justify-content-center text-center sub'>
                <FaRegHandPointer className='icons' style={{backgroundColor:'red'}}/>
                <p className='subHeads'>Best Tutors</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
            <div className='col-2 justify-content-center text-center sub' >
                <GiBookmarklet className='icons' style={{backgroundColor:'#4c4c72'}}/>
                <p className='subHeads'>Best Curriculum</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
            <div className='col-2 justify-content-center text-center sub'>
                <PiCertificate className='icons' style={{backgroundColor:'#db1033'}}/>
                <p className='subHeads'>Certificate</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
            <div className='col-2 justify-content-center text-center sub'>
                <BsCashCoin className='icons' style={{backgroundColor:'#ff8100'}}/>
                <p className='subHeads'>Best Price</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
        </div>
        <div className='row d-flex justify-content-center' >
            <div className='col-2  justify-content-center text-center sub'>
                <HiLightBulb className='icons' style={{backgroundColor:'#ffba00'}}/>
                <p className='subHeads'>Critical Thinking</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
            <div className='col-2  justify-content-center text-center sub' >
                <LiaCertificateSolid className='icons' style={{backgroundColor:'rgb(97 29 102)'}}/>
                <p className='subHeads'>Scholarships</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
            <div className='col-2  justify-content-center text-center sub'>
                <MdReportProblem className='icons' style={{backgroundColor:'rgb(179 14 67)'}}/>
                <p className='subHeads'>Problem Solving</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
            <div className='col-2  justify-content-center text-center sub'>
                <HiDesktopComputer className='icons' style={{backgroundColor:'rgb(23 130 132)'}}/>
                <p className='subHeads'>Technical Assessment</p>
                <p className='subHeadsContent'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                </p>
            </div>
        </div>
    </div>
  )
}

export default BannerSecond
