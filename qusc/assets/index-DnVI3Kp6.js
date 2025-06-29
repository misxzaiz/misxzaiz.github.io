import{_ as L,c as r,a as i,I as p,J as a,K as d,f as e,F as g,d as f,R as _,t as o,b as x,h as C}from"./index-0g_e_Ani.js";const k={name:"AlgorithmNotes",data(){return{activeTab:"sorting",categories:[{id:"sorting",name:"排序算法"},{id:"searching",name:"查找算法"},{id:"dp",name:"动态规划"},{id:"graph",name:"图算法"},{id:"tree",name:"树算法"}],algorithms:[]}},mounted(){this.loadAlgorithms()},methods:{loadAlgorithms(){this.algorithms=this.getAlgorithmData()},getAlgorithmsForCategory(m){return this.algorithms.filter(t=>t.category===m)},showSolution(m,t){const u=this.algorithms.find(w=>w.id===m);u&&u.problems[t]&&this.$set(u.problems[t],"showSolution",!0)},getAlgorithmData(){return[{id:"bubble-sort",name:"冒泡排序",category:"sorting",description:`
            <p>冒泡排序是一种简单的排序算法，它重复地遍历要排序的列表，比较相邻的两个元素，如果它们的顺序错误就交换它们。</p>
            <p>原理：每次遍历，将最大的元素"浮"到列表的末尾。</p>
          `,implementation:`public void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = false;
        // 每次内循环，将最大元素冒泡到末尾
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换arr[j]和arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        // 如果在本轮没有发生交换，说明数组已经排序完成
        if (!swapped) break;
    }
}`,timeComplexity:"O(n²)",spaceComplexity:"O(1)",problems:[{title:"问题1：优化冒泡排序",description:"实现一个优化版的冒泡排序，记录最后一次交换的位置，减少不必要的比较。",solution:"可以通过记录最后一次交换的位置来确定下一轮比较的边界，因为最后一次交换位置之后的元素已经排好序了。",code:`public void optimizedBubbleSort(int[] arr) {
    int n = arr.length;
    int lastSwappedIndex = 0;
    int sortBorder = n - 1;
    
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        
        for (int j = 0; j < sortBorder; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
                lastSwappedIndex = j;
            }
        }
        sortBorder = lastSwappedIndex;
        
        if (!swapped) break;
    }
}`,showSolution:!1}]},{id:"quick-sort",name:"快速排序",category:"sorting",description:`
            <p>快速排序是一种分治算法，它通过选择一个"基准"元素，将数组分为两个子数组，小于基准的元素和大于基准的元素，然后递归地对子数组进行排序。</p>
            <p>快速排序是目前使用最广泛的排序算法之一，平均情况下效率很高。</p>
          `,implementation:`public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        // 获取基准元素位置
        int pivotIndex = partition(arr, low, high);
        
        // 递归排序基准元素左右两部分
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

private int partition(int[] arr, int low, int high) {
    // 选择最后一个元素作为基准
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        // 将比基准小的元素放到左侧
        if (arr[j] < pivot) {
            i++;
            // 交换arr[i]和arr[j]
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    // 将基准放到正确位置
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1; // 返回基准位置
}`,timeComplexity:"平均：O(n log n)，最坏：O(n²)",spaceComplexity:"O(log n)",problems:[{title:"问题1：随机化快速排序",description:"当输入数组已经部分排序时，快速排序的性能可能退化为O(n²)。为防止这种情况，实现一个随机选择基准元素的快速排序。",solution:"通过随机选择基准元素而不是总是选择第一个或最后一个元素，可以降低遇到最坏情况的概率。",code:`import java.util.Random;

public void randomizedQuickSort(int[] arr, int low, int high) {
    if (low < high) {
        // 随机选择基准元素
        int pivotIndex = randomizedPartition(arr, low, high);
        
        randomizedQuickSort(arr, low, pivotIndex - 1);
        randomizedQuickSort(arr, pivotIndex + 1, high);
    }
}

private int randomizedPartition(int[] arr, int low, int high) {
    // 随机选择基准
    Random rand = new Random();
    int randomIndex = low + rand.nextInt(high - low + 1);
    
    // 将随机选择的基准与最后一个元素交换
    int temp = arr[randomIndex];
    arr[randomIndex] = arr[high];
    arr[high] = temp;
    
    return partition(arr, low, high);
}`,showSolution:!1}]},{id:"binary-search",name:"二分查找",category:"searching",description:`
            <p>二分查找是一种高效的查找算法，用于在有序数组中查找特定元素。它的工作原理是将查找空间一分为二，比较中间元素与目标值，然后在适当的半部分继续查找。</p>
            <p>二分查找的前提条件是数组必须已排序。</p>
          `,implementation:`public int binarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // 避免整数溢出
        
        // 检查中间元素
        if (arr[mid] == target) {
            return mid; // 找到目标，返回索引
        }
        
        // 如果目标在左半部分
        if (arr[mid] > target) {
            right = mid - 1;
        }
        // 如果目标在右半部分
        else {
            left = mid + 1;
        }
    }
    
    return -1; // 没有找到目标
}`,timeComplexity:"O(log n)",spaceComplexity:"O(1)",problems:[{title:"问题1：查找第一个等于目标值的元素",description:"在有重复元素的有序数组中，查找第一个等于目标值的元素的位置。",solution:"当找到一个等于目标值的元素时，不要立即返回，而是继续在左半部分查找可能存在的更靠前的相等元素。",code:`public int findFirstOccurrence(int[] arr, int target) {
    int left = 0;
    int right = arr.length - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        // 如果找到目标值
        if (arr[mid] == target) {
            result = mid; // 记录这个位置
            right = mid - 1; // 继续在左半部分查找
        }
        // 如果目标在左半部分
        else if (arr[mid] > target) {
            right = mid - 1;
        }
        // 如果目标在右半部分
        else {
            left = mid + 1;
        }
    }
    
    return result;
}`,showSolution:!1}]},{id:"hash-search",name:"哈希查找",category:"searching",description:`
            <p>哈希查找是一种利用哈希表进行快速查找的方法。它通过哈希函数将关键字映射到表中的位置来访问记录。</p>
            <p>在理想情况下，哈希查找的时间复杂度为O(1)，是最高效的查找方式之一。</p>
          `,implementation:`import java.util.HashMap;

public boolean hashSearch(int[] arr, int target) {
    // 创建哈希表
    HashMap<Integer, Integer> hashMap = new HashMap<>();
    
    // 将数组元素加入哈希表
    for (int i = 0; i < arr.length; i++) {
        hashMap.put(arr[i], i);
    }
    
    // 查找目标值
    return hashMap.containsKey(target);
}`,timeComplexity:"平均：O(1)，最坏：O(n)",spaceComplexity:"O(n)",problems:[{title:"问题1：两数之和",description:"给定一个整数数组nums和一个整数目标值target，请你在该数组中找出和为目标值的两个整数，并返回它们的数组下标。",solution:"使用哈希表记录已经遍历过的数字及其索引，对于每个数字，检查target减去该数字的结果是否在哈希表中。",code:`public int[] twoSum(int[] nums, int target) {
    HashMap<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        // 如果找到互补数字
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        
        // 将当前数字加入哈希表
        map.put(nums[i], i);
    }
    
    // 没有解决方案
    return new int[0];
}`,showSolution:!1}]},{id:"fibonacci-dp",name:"斐波那契数列（动态规划）",category:"dp",description:`
            <p>斐波那契数列是一个经典的问题，可以用动态规划高效解决。数列定义为：F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)（n ≥ 2）。</p>
            <p>使用动态规划可以避免递归解法中的重复计算问题。</p>
          `,implementation:`public int fibonacci(int n) {
    // 特殊情况处理
    if (n <= 1) {
        return n;
    }
    
    // 创建DP数组
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    // 填充DP数组
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,timeComplexity:"O(n)",spaceComplexity:"O(n)",problems:[{title:"问题1：优化空间复杂度",description:"优化斐波那契数列计算的空间复杂度，使其为O(1)。",solution:"由于每次计算只需要前两个数，我们可以只保存两个变量而不需要整个数组。",code:`public int fibonacciOptimized(int n) {
    if (n <= 1) {
        return n;
    }
    
    int prev = 0;
    int current = 1;
    
    for (int i = 2; i <= n; i++) {
        int next = prev + current;
        prev = current;
        current = next;
    }
    
    return current;
}`,showSolution:!1}]},{id:"longest-increasing-subsequence",name:"最长递增子序列",category:"dp",description:`
            <p>最长递增子序列(LIS)是在一个给定的数字序列中，找到一个子序列，使得这个子序列元素单调递增且长度最长。</p>
            <p>注意：子序列不要求连续，但要保持原序列中元素的相对顺序。</p>
          `,implementation:`import java.util.Arrays;

public int lengthOfLIS(int[] nums) {
    if (nums == null || nums.length == 0) {
        return 0;
    }
    
    int n = nums.length;
    int[] dp = new int[n]; // dp[i]表示以nums[i]结尾的LIS长度
    Arrays.fill(dp, 1); // 每个元素自身构成长度为1的LIS
    
    int maxLength = 1;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }
    
    return maxLength;
}`,timeComplexity:"O(n²)",spaceComplexity:"O(n)",problems:[{title:"问题1：打印最长递增子序列",description:"除了求解最长递增子序列的长度外，还要输出其中一个最长递增子序列。",solution:"在计算dp数组的同时，记录每个位置的前驱节点，然后从最大长度位置回溯构建子序列。",code:`import java.util.Arrays;

public int[] findLIS(int[] nums) {
    if (nums == null || nums.length == 0) {
        return new int[0];
    }
    
    int n = nums.length;
    int[] dp = new int[n]; // dp[i]表示以nums[i]结尾的LIS长度
    int[] prev = new int[n]; // 记录前驱节点
    
    Arrays.fill(dp, 1);
    Arrays.fill(prev, -1);
    
    int maxLength = 1;
    int maxLengthIndex = 0;
    
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j; // 记录前驱
            }
        }
        
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxLengthIndex = i;
        }
    }
    
    // 回溯构建LIS
    int[] result = new int[maxLength];
    int currentIndex = maxLengthIndex;
    
    for (int i = maxLength - 1; i >= 0; i--) {
        result[i] = nums[currentIndex];
        currentIndex = prev[currentIndex];
    }
    
    return result;
}`,showSolution:!1}]}]}}},O={class:"algorithm-notes"},A={class:"category-content"},M={class:"algorithm-title"},F=["innerHTML"],z={class:"java"},B={class:"complexity"},H={key:0,class:"solution"},V={key:0},T={class:"java"};function q(m,t,u,w,c,b){const h=d("el-collapse-item"),v=d("el-button"),y=d("el-collapse"),I=d("el-tab-pane"),S=d("el-tabs");return e(),r("div",O,[t[5]||(t[5]=i("h1",{class:"title"},"Java算法笔记",-1)),p(S,{modelValue:c.activeTab,"onUpdate:modelValue":t[0]||(t[0]=l=>c.activeTab=l),type:"card"},{default:a(()=>[(e(!0),r(g,null,f(c.categories,l=>(e(),_(I,{key:l.id,label:l.name,name:l.id},{default:a(()=>[i("div",A,[(e(!0),r(g,null,f(b.getAlgorithmsForCategory(l.id),n=>(e(),r("div",{key:n.id,class:"algorithm-item"},[i("h2",M,o(n.name),1),i("div",{class:"algorithm-description",innerHTML:n.description},null,8,F),p(y,null,{default:a(()=>[p(h,{title:"代码实现"},{default:a(()=>[i("pre",null,[i("code",z,o(n.implementation),1)])]),_:2},1024),p(h,{title:"复杂度分析"},{default:a(()=>[i("div",B,[i("p",null,[t[1]||(t[1]=i("strong",null,"时间复杂度:",-1)),x(" "+o(n.timeComplexity),1)]),i("p",null,[t[2]||(t[2]=i("strong",null,"空间复杂度:",-1)),x(" "+o(n.spaceComplexity),1)])])]),_:2},1024),p(h,{title:"题目练习"},{default:a(()=>[(e(!0),r(g,null,f(n.problems,(s,j)=>(e(),r("div",{key:j,class:"problem"},[i("h3",null,o(s.title),1),i("p",null,o(s.description),1),s.showSolution?(e(),r("div",H,[t[3]||(t[3]=i("h4",null,"解题思路",-1)),i("p",null,o(s.solution),1),s.code?(e(),r("pre",V,[i("code",T,o(s.code),1)])):C("",!0)])):(e(),_(v,{key:1,onClick:D=>b.showSolution(n.id,j),size:"small"},{default:a(()=>t[4]||(t[4]=[x("查看解答")])),_:2,__:[4]},1032,["onClick"]))]))),128))]),_:2},1024)]),_:2},1024)]))),128))])]),_:2},1032,["label","name"]))),128))]),_:1},8,["modelValue"])])}const P=L(k,[["render",q],["__scopeId","data-v-d761dc8b"]]);export{P as default};
