import { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JOB_APPLICANT_COLUMNS, JOB_APPLICANT_DATA } from "@/constants";
import ButtonActionTable from "../ButtonActionTable";
// import { Applicant, User } from "@prisma/client";

// type applicantType = {
// 	user: User | null;
// } & Applicant;

interface ApplicantsProps {
  // applicants: applicantType[] | undefined;
}

// const Applicants: FC<ApplicantsProps> = ({ applicants }) => {
const Applicants: FC<ApplicantsProps> = ({}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {JOB_APPLICANT_COLUMNS.map((item: string, i: number) => (
            <TableHead key={item + i}>{item}</TableHead>
          ))}
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {JOB_APPLICANT_DATA.map((item: any, i: number) => (
          <TableRow key={item.name + i}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.appliedDate}</TableCell>
            <TableCell>
              <ButtonActionTable url={"/job-detail/1"} />
              {/* <ButtonActionTable url={`/job-detail/${item.id}`} /> */}
            </TableCell>
          </TableRow>
        ))}
        {/* {applicants && (
					<>
						{applicants.map((item: any, i: number) => (
							<TableRow key={item.id + i}>
								<TableCell>{item.user.name}</TableCell>
								<TableCell>
									<ButtonActionTable url="" />
								</TableCell>
							</TableRow>
						))}
					</>
				)} */}
      </TableBody>
    </Table>
  );
};

export default Applicants;
