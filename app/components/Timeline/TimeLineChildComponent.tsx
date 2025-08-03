import { useEffect, useState } from "react";
import { History } from "@/app/constants/sharedconstants";
import { customBadgeTheme, customTimeLine } from "@/app/SiteTheme/Theme";
import axios from "axios";
import { Badge, Timeline, Tooltip } from "flowbite-react";
import { HiCalendar, HiCheck } from "react-icons/hi";

const TimeLineChildComponent = ({
  id,
  date,
  status,
  category,
  RegNo,
  Company,
  body,
  stage,
  outcome,
  recommendations,
}: History) => {
  const [stageName, setStageName] = useState<string>("");

  useEffect(() => {
    const fetchStageName = async () => {
      try {
        const response = await axios.get(`/api/applicationstages?id=${stage}`);
        if (response.status === 200) {
          const { stageName } = response?.data?.stageName;
          setStageName(stageName || "");
        }
      } catch (error) {
        console.error("Failed to fetch stage name", error);
      }
    };

    fetchStageName();
  }, [stage]);

  return (
    <Timeline className="rounded border shadow mt-2" theme={customTimeLine}>
      <Timeline.Item>
        <Timeline.Point icon={() => <HiCalendar color="white" />} />
        <Timeline.Content>
          <Timeline.Time>{date}</Timeline.Time>
          <Tooltip content={RegNo}>
            <Badge
              theme={customBadgeTheme}
              className="w-fit text-sm mb-1"
              color="light"
            >
              {Company}
            </Badge>
          </Tooltip>

          <div className="flex gap-2">
            <Badge
              theme={customBadgeTheme}
              className="w-fit text-sm"
              color="success"
            >
              Status : {status}
            </Badge>
            <Badge
              theme={customBadgeTheme}
              className="w-fit text-sm"
              color="success"
            >
              Category : {category}
            </Badge>
            <Badge
              theme={customBadgeTheme}
              className="w-fit text-sm"
              color="success"
            >
              Tracking code/Ref : {id}
            </Badge>
          </div>

          <Timeline.Body className="tracking-tight text-wrap">
            {body}
          </Timeline.Body>

          {status === "closed" && (
            <p className="bg-appGray w-fit p-1 rounded-sm text-white">
              {outcome ? "Outcome : " + outcome : null}
            </p>
          )}
          {recommendations && recommendations !== "" && (
            <p className="bg-appGray w-fit p-1 rounded-sm text-white">
              Recommendation:{" "}
              {recommendations.length > 350
                ? `${recommendations.slice(0, 350)}...`
                : recommendations}
            </p>
          )}
        </Timeline.Content>
      </Timeline.Item>

      <Badge
        className={`w-fit m-2 ${
          outcome === "failed" || outcome === "Rejected"
            ? "bg-red-700"
            : "bg-appGreen"
        } text-white`}
        icon={HiCheck}
      >
        {stageName}
      </Badge>
    </Timeline>
  );
};

export default TimeLineChildComponent;
