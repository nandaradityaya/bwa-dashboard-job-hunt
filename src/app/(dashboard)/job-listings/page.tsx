import { FC } from "react";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
import { dateFormat } from "@/lib/utils";
import { Job } from "@prisma/client";
import moment from "moment";
import { getServerSession } from "next-auth";
import prisma from "../../../../lib/prisma";

interface JobListingsPageProps {}

export const revalidate = 0;

async function getDataJobs() {
  // ambil data berdasarkan session yg login
  const session = await getServerSession(authOptions);

  // langsung hit ke prismanya saja karena ini pake server side, jadi gaperlu hit API
  // findMany karna kita mau mencari beberapa job yg ada di perusahaan tersebut
  const jobs = prisma.job.findMany({
    // dimana companyId berdasarkan session
    where: {
      companyId: session?.user.id,
    },
  });

  return jobs;
}

const JobListingsPage: FC<JobListingsPageProps> = async ({}) => {
  const jobs = await getDataJobs();

  // hasil clg muncul di terminal bukan di console chrome karna kita pake server side
  console.log(jobs);

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
            {jobs.map((item: Job, i: number) => (
              <TableRow key={item.roles + i}>
                <TableCell>{item.roles}</TableCell>
                <TableCell>
                  {/* pake moment untuk cek sudah dueDate atau belum postingan jobnya */}
                  {moment(item.datePosted).isBefore(item.dueDate) ? (
                    <Badge>Live</Badge>
                  ) : (
                    <Badge variant="destructive">Expired</Badge>
                  )}
                </TableCell>
                <TableCell>{dateFormat(item.datePosted)}</TableCell>
                <TableCell>{dateFormat(item.dueDate)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.jobType}</Badge>
                </TableCell>
                <TableCell>{item.applicants}</TableCell>
                <TableCell>
                  {item.applicants} / {item.needs}
                </TableCell>
                <TableCell>
                  <ButtonActionTable url={`/job-detail/${item.id}`} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default JobListingsPage;
