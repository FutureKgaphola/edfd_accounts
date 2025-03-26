import { History } from "@/app/constants/sharedconstants";
import { customBadgeTheme, customProgTheme, customTimeLine } from "@/app/SiteTheme/Theme";
import { Badge, Progress, Timeline } from "flowbite-react";
import { HiCalendar, HiCheck, HiClock } from "react-icons/hi";

const TimeLineChildComponent = ({ id,date, status, category, title, body,stage,outcome }: History) => {
    return (
       
            <Timeline className="rounded border shadow mt-2" theme={customTimeLine}>
                <Timeline.Item>
                    <Timeline.Point icon={() => <HiCalendar color="white" />} />
                    <Timeline.Content>
                        <Timeline.Time>{date}</Timeline.Time>
                        <div className="flex gap-2">
                            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">Status : {status}</Badge>
                            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">category : {category}</Badge>
                            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">Tracking code : {id}</Badge>
                        </div>
                        <Timeline.Title>{title}</Timeline.Title>
                        <Timeline.Body className=" tracking-tight text-wrap">
                            {body}
                        </Timeline.Body>
                        <p className="bg-appGray w-fit p-1 rounded-sm text-white"> {outcome ? "Outcome : "+outcome :null}</p>
                    </Timeline.Content>
                </Timeline.Item>
                <div className="flex flex-row ml-4 mb-2 gap-2">
                    {stage?.map((item) => (

                        <Badge className="w-fit bg-appGreen text-white" icon={HiCheck}>{item}</Badge>
                    ))}
                </div>
                <Progress progress={15} theme={customProgTheme} size="sm" color="red" />
            </Timeline>

    );
}

export default TimeLineChildComponent;