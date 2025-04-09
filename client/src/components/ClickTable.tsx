import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Click {
  ip: string;
  createdAt: string;
}

interface ClickTableProps {
  clicks: Click[];
}

function ClickTable({ clicks }: ClickTableProps) {
  return (
    <Table className="border rounded-lg mt-[50px]">
      <TableHeader>
        <TableRow>
          <TableHead>Ip</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clicks?.map((click) => (
          <TableRow key={click.ip}>
            <TableCell className="w-[200px] max-w-[200px] truncate">
              {click.ip}
            </TableCell>
            <TableCell className="max-w-[200px] truncate">
              {new Date(click.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ClickTable;
