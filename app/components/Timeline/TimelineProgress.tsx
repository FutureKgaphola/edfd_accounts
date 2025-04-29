"use client";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import {
  PiNumberCircleOneBold, PiNumberCircleTwoBold,
  PiNumberCircleThreeBold, PiNumberCircleFourBold,
  PiNumberCircleFiveBold, PiNumberCircleSixBold,
  PiNumberCircleSevenBold
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { TabSliceAction } from "@/lib/features/Tabprofile/TabprofileSlice";
import { TackApplicationAction } from "@/lib/features/TrackApplicationWithKey/TrackWithKey";
import { RootState } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const TimelineProgress = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [groupOne,setgroupOne] = useState([]);
  const [groupTwo,setgroupTwo] = useState([]);
  const [groupThree,setgroupThree] = useState([]);
  const [groupFour,setgroupFour] = useState([]);
  const [groupFive,setgroupFive] = useState([]);
  const [groupSix,setgroupSix] = useState([]);
  const [groupSeven,setgroupSeven] = useState([]);
  const Authprop = useSelector((state: RootState) => state.AuthReducer);

  const { data, isLoading, error } = useQuery({
    queryFn: () => axios.get(`api/application_group_by_stages?user_email=${Authprop?.user?.user_email}`),
    queryKey: ["applicationsByStages"],
   enabled: !!Authprop?.user?.user_email
});

useEffect(()=>{
  setgroupOne(data?.data?.groupOne)
  setgroupTwo(data?.data?.groupTwo)
  setgroupThree(data?.data?.groupThree)
  setgroupFour(data?.data?.groupFour)
  setgroupFive(data?.data?.groupFive)
  setgroupSix(data?.data?.groupSix)
  setgroupSeven(data?.data?.groupSeven)
},[data]);
  const HandleProfileTab = (value: string, applicationId: string) => {
    dispatch(TabSliceAction.SelectedTab({ tab: value }));
    dispatch(TackApplicationAction?.TrackwithEmailNRef({
      userId: Authprop?.user?.user_email,
      applicationId: applicationId
    }));
    router.push("/profile");
  };

  return (
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
        <div className='flex flex-col relative overflow-x-auto max-h-[400px] h-32'>
          {groupOne?.map((item: any, index: number) => (
            <div key={index} className="flex flex-row items-center justify-between mt-2 bg-appGray rounded-lg p-2">
              <p className="font-thin text-xs bg-amber-500 rounded-md p-1">{item?.companyName}</p>
              <p className="text-white font-poppinsRegular text-sm">{item?.applicationRef}</p>
              <button onClick={() => HandleProfileTab("track", item?.applicationRef)} className="bg-white text-appGreen font-poppinsRegular text-sm px-2 py-1 rounded">View</button>
            </div>
          ))}
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
        <div className='flex flex-col relative overflow-x-auto max-h-[400px] h-32'>
          {groupTwo?.map((item: any, index: number) => (
            <div key={index} className="flex flex-row items-center justify-between mt-2 bg-appGray rounded-lg p-2">
            <p className="text-white font-poppinsRegular text-sm">{item?.applicationRef}</p>
            <button onClick={() => HandleProfileTab("track", item?.applicationRef)} className="bg-white text-appGreen font-poppinsRegular text-sm px-2 py-1 rounded">View</button>
          </div>
          ))}
        </div>
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
        <div className='flex flex-col relative overflow-x-auto max-h-[400px] h-32'>
          {groupThree?.map((item: any, index: number) => (
            <div key={index} className="flex flex-row items-center justify-between mt-2 bg-appGray rounded-lg p-2">
            <p className="text-white font-poppinsRegular text-sm">{item?.applicationRef}</p>
            <button onClick={() => HandleProfileTab("track", item?.applicationRef)} className="bg-white text-appGreen font-poppinsRegular text-sm px-2 py-1 rounded">View</button>
          </div>
          ))}
        </div>
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
  );
};

export default TimelineProgress;
