import { History } from "@/app/constants/sharedconstants";
import { customBadgeTheme, customProgTheme, customsubmitTheme, customTimeLine } from "@/app/SiteTheme/Theme";
import { Badge, Button, Progress, Timeline } from "flowbite-react";
import { HiCalendar, HiCheck, HiClock } from "react-icons/hi";

const TimeLineChildComponent = ({ id,date, status, category, title, body,stage,outcome }: History) => {
    return (
            <Timeline className="rounded border shadow mt-2 relative" theme={customTimeLine}>
                {status=="open" ? (<Button size="xs" className="mt-2 w-fit absolute top-0 right-1" theme={customsubmitTheme} type="submit" color="warning">Withdraw Application</Button>) :null }
                <Timeline.Item>
                    <Timeline.Point icon={() => <HiCalendar color="white" />} />
                    <Timeline.Content>
                        <Timeline.Time>{date}</Timeline.Time>
                        <div className="flex gap-2">
                            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">Status : {status}</Badge>
                            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">category : {category}</Badge>
                            <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">Tracking code/Ref : {id}</Badge>
                        </div>
                        {/* <Timeline.Title>{title}</Timeline.Title> */}
                        <Timeline.Body className=" tracking-tight text-wrap">
                            {body}
                        </Timeline.Body>
                        {status==="closed" && <p className="bg-appGray w-fit p-1 rounded-sm text-white"> {outcome ? "Outcome : "+outcome :null}</p>}
                    </Timeline.Content>
                </Timeline.Item>
                <div className="flex flex-row ml-4 mb-2 gap-2 overflow-x-auto">
                    {stage?.map((item) => (
                        <Badge className={`w-fit ${outcome == "failed" ? 'bg-red-700':'bg-appGreen'} text-white` } icon={HiCheck}>{item}</Badge>
                    ))}
                </div>
                {/* <Progress progress={15} theme={customProgTheme} size="sm" color="red" /> */}
            </Timeline>

    );
}

export default TimeLineChildComponent;