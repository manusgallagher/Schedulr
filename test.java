public class test{
	public static void main(String[]args){
		String code = "r123c561";
		int indexOfC = 0;
		
		for(int i=0; i<code.length(); i++){
			if(code.charAt(i)=='c'){
				indexOfC = i;
			}	
		}
	
		String rValue = code.substring(0, indexOfC);
		String cValue = code.substring(indexOfC, code.length());
		
		System.out.println(rValue);
		System.out.println(cValue);
	}
}