import Styles from "./proposal-loading.module.scss";

export default function ProposalPodiumLoading({ priority }: { priority: number }) {
    return (
        <div className={Styles.skeletonCard}>
            <span className="font-medium mb-1">
            <span className="font-extrabold text-xl">
                {priority}º&nbsp;
            </span>
            melhor Acordo
            </span>
            <span className="font-bold gap-2 text-4xl inline-flex w-48">
            R$ <span className={Styles.field}></span>
            </span>
            <span className="font-medium text-gray-400 text-sm text-center">
            p/ mês
            </span>
            <span className="flex w-4/5 h-10 m-4">
            <span className={Styles.field}></span>
            </span>
            <ul className="font-medium text-sm text-gray-400 w-4/5">
            <li><span className={Styles.field}></span></li>
            <li><span className={Styles.field}></span></li>
            <li><span className={Styles.field}></span></li>
            <li><span className={Styles.field}></span></li>
            <li><span className={Styles.field}></span></li>
            </ul>
        </div>
    )
}