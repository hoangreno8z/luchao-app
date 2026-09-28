export interface DoFReport {
  readonly variableCount:number;
  readonly equationCount:number;
  readonly numericalRank:number;
  readonly localDoF:number;
}

export class DoFAnalyzer {
  static analyze(jacobian: readonly (readonly number[])[], tolerance=1e-8):DoFReport {
    const n=jacobian[0]?.length??0;
    const rank=this.rank(jacobian,tolerance);
    return {
      variableCount:n,
      equationCount:jacobian.length,
      numericalRank:rank,
      localDoF:n-rank
    };
  }

  private static rank(a: readonly (readonly number[])[], tol:number):number {
    const m=a.length,n=a[0]?.length??0;
    const q=a.map(r=>[...r]);
    let rank=0;
    for(let c=0;c<n && rank<m;c++){
      let p=rank;
      for(let r=rank+1;r<m;r++)
        if(Math.abs(q[r][c])>Math.abs(q[p][c])) p=r;
      if(Math.abs(q[p][c])<=tol) continue;
      [q[p],q[rank]]=[q[rank],q[p]];
      for(let r=rank+1;r<m;r++){
        const f=q[r][c]/q[rank][c];
        for(let k=c;k<n;k++) q[r][k]-=f*q[rank][k];
      }
      rank++;
    }
    return rank;
  }
}
