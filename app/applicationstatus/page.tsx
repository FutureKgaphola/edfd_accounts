"use client";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Nav_bar } from '../components/Navbar';
import { TackApplicationAction } from "@/lib/features/TrackApplicationWithKey/TrackWithKey";
import {
    PiNumberCircleOneBold, PiNumberCircleTwoBold,
    PiNumberCircleThreeBold, PiNumberCircleFourBold,
    PiNumberCircleFiveBold, PiNumberCircleSixBold,
    PiNumberCircleSevenBold
} from "react-icons/pi";

import tree from "../assets/images/tree.jpg";
import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
const Applicationstatus = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const Authprop = useSelector((state: RootState) => state.AuthReducer);
    return (
        <div>
            <Nav_bar />
            <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
                <div className="relative">
                    <Image className="w-full h-40 bg-no-repeat object-cover" src={tree} alt=".." />

                </div>
                <Card className='relative z-10 -mt-32 bg-white scroll-m-8 ml-4 mr-4 mb-6 border-r shadow border-appGreen rounded'>
                    <p className="z-10 absolute left-2 -top-3 bg-appGreen text-white text-medium font-poppinsRegular shadow rounded p-1">Applications Status Progress</p>
                    <VerticalTimeline lineColor='#92981b'>

                        <VerticalTimelineElement
                            visible={true}
                            className="vertical-timeline-element--work z-20"
                            contentStyle={{ background: '#92981b' }}
                            contentArrowStyle={{ borderRight: '7px solid  #92981b' }}
                            iconStyle={{ background: '#92981b', color: 'white' }}
                            icon={<PiNumberCircleOneBold />}
                        >
                            <h3 className="vertical-timeline-element-title text-white font-poppinsRegular text-lg">Basic Assessment and Due Deligence</h3>
                            <div className='flex flex-col'>
                                <p onClick={() => {
                                    dispatch(TackApplicationAction?.TrackwithEmailNRef({ userId: Authprop?.user?.user_email, applicationId: 'EDFD-01789| 28-02-2025' }))
                                    router?.push('/profile');
                                }} className='text-white underline hover:cursor-pointer'>1. Ref EDFD-01789| 28-02-2025</p>
                                <p onClick={() => {
                                    dispatch(TackApplicationAction?.TrackwithEmailNRef({ userId: Authprop?.user?.user_email, applicationId: 'EDFD-01911| 01-03-2025' }))
                                    router?.push('/profile');
                                }} className='text-white underline hover:cursor-pointer'>2. Ref EDFD-01911| 01-03-2025</p>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            visible={true}
                            className="vertical-timeline-element--work z-20"
                            contentStyle={{ background: '#F7F7F7', color: 'black', boxShadow: '0px -6px 10px #92981b' }}
                            contentArrowStyle={{ borderRight: '7px solid  #92981b' }}
                            iconStyle={{ background: '#837676', color: 'white' }}
                            icon={<PiNumberCircleTwoBold />}
                        >
                            <h3 className="vertical-timeline-element-title text-black font-poppinsRegular text-lg">Assessment and Review</h3>

                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            visible={true}
                            className="vertical-timeline-element--work z-20"
                            contentStyle={{ background: '#F7F7F7', color: 'black', boxShadow: '0px -6px 10px #92981b' }}
                            contentArrowStyle={{ borderRight: '7px solid  #92981b' }}
                            iconStyle={{ background: '#837676', color: 'white' }}
                            icon={<PiNumberCircleThreeBold />}
                        >
                            <h3 className="vertical-timeline-element-title text-black font-poppinsRegular text-lg">Credit and Risk Assessment</h3>

                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            visible={true}
                            className="vertical-timeline-element--work z-20"
                            contentStyle={{ background: '#92981b', color: 'white' }}
                            contentArrowStyle={{ borderRight: '7px solid  #92981b' }}
                            iconStyle={{ background: '#92981b', color: 'white' }}
                            icon={<PiNumberCircleFourBold />}
                        >
                            <h3 className="vertical-timeline-element-title text-white font-poppinsRegular text-lg">Review of Credit and Risk Assessment</h3>

                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            visible={true}
                            className="vertical-timeline-element--work z-20"
                            contentStyle={{ background: '#92981b', color: 'white' }}
                            contentArrowStyle={{ borderRight: '7px solid  #92981b' }}

                            iconStyle={{ background: '#92981b', color: 'white' }}
                            icon={<PiNumberCircleFiveBold />}
                        >
                            <h3 className="vertical-timeline-element-title text-white font-poppinsRegular text-lg">Considerations and Approval or Recommendation</h3>

                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            visible={true}
                            className="vertical-timeline-element--work z-20"
                            contentStyle={{ background: '#F7F7F7', color: 'black', boxShadow: '0px -6px 10px #92981b' }}
                            contentArrowStyle={{ borderRight: '7px solid  #92981b' }}

                            iconStyle={{ background: '#837676', color: 'white' }}
                            icon={<PiNumberCircleSixBold />}
                        >
                            <h3 className="vertical-timeline-element-title text-black font-poppinsRegular text-lg">Final Approval and or Recommendation</h3>

                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            visible={true}
                            className="vertical-timeline-element--work z-20"
                            contentStyle={{ background: '#F7F7F7', color: 'black', boxShadow: '0px -6px 10px #92981b' }}
                            contentArrowStyle={{ borderRight: '7px solid  #92981b' }}

                            iconStyle={{ background: '#837676', color: 'white' }}
                            icon={<PiNumberCircleSevenBold />}
                        >
                            <h3 className="vertical-timeline-element-title text-black font-poppinsRegular text-lg">Review of Security Documents and Check Payment Requisitions</h3>

                        </VerticalTimelineElement>
                    </VerticalTimeline>
                </Card>
            </div>
        </div>
    );
}

export default Applicationstatus;