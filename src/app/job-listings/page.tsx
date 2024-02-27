import { FC } from "react";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonActionTable from "@/components/organisms/ButtonActionTable";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_LISTING_COLUMNS, JOB_LISTING_DATA } from "@/constants";
// import { dateFormat } from "@/lib/utils";
// import { Job } from "@prisma/client";
// import moment from "moment";
// import { getServerSession } from "next-auth";
// import prisma from "../../../../lib/prisma";

interface JobListingsPageProps {}

export const revalidate = 0;

// async function getDataJobs() {
// 	const session = await getServerSession(authOptions);

// 	const jobs = prisma.job.findMany({
// 		where: {
// 			companyId: session?.user.id,
// 		},
// 	});

// 	return jobs;
// }

const JobListingsPage: FC<JobListingsPageProps> = async ({}) => {
  // const jobs = await getDataJobs();

  // console.log(jobs);

  return (
    <div>
      <div className="font-semibold text-3xl">Job Listings</div>

      <div className="mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              {/*JOB_LISTING_COLUMNS dari constant */}
              {JOB_LISTING_COLUMNS.map((item: string, i: number) => (
                <TableHead key={item + i}>{item}</TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {JOB_LISTING_DATA.map((item: any, i: number) => (
              <TableRow key={item.roles + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  <Badge variant="destructive">{item.status}</Badge>
                </TableCell>
                <TableCell>{item.datePosted}</TableCell>
                <TableCell>{item.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  <ButtonActionTable url={"/job-detail/1"} />
                  {/* <ButtonActionTable url={`/job-detail/${item.id}`} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableBody>
						{jobs.map((item: Job, i: number) => (
							<TableRow key={item.roles + i}>
								<TableCell>{item.roles}</TableCell>
								<TableCell>
									{moment(item.datePosted).isBefore(
										item.dueDate
									) ? (
										<Badge>Live</Badge>
									) : (
										<Badge variant="destructive">
											Expired
										</Badge>
									)}
								</TableCell>
								<TableCell>
									{dateFormat(item.datePosted)}
								</TableCell>
								<TableCell>
									{dateFormat(item.dueDate)}
								</TableCell>
								<TableCell>
									<Badge variant="outline">
										{item.jobType}
									</Badge>
								</TableCell>
								<TableCell>{item.applicants}</TableCell>
								<TableCell>
									{item.applicants} / {item.needs}
								</TableCell>
								<TableCell>
									<ButtonActionTable
										url={`/job-detail/${item.id}`}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody> */}
        </Table>
      </div>
    </div>
  );
};

export default JobListingsPage;
