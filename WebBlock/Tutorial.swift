//
//  Tutorial.swift
//  HighLightApp
//
//  Created by itsactuallyme on 07/10/2021.
//

import SwiftUI

struct Tutorial: View {
    var body: some View {
        TabView {
            Step1()
            Step2()
            Step3()
        }  .tabViewStyle(PageTabViewStyle())
            .indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))
            .background(Color.white).ignoresSafeArea(.all)
    }
}

struct Step1: View {
    var body: some View {
        ZStack{
            VStack{
                Spacer()
                HStack{
                    Image("bottomBg")
                    Spacer()
                }
    
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity)
            VStack(spacing: 20){
                VStack{
                    Text("STEP 1")
                          .foregroundColor(Color("SECONDARY"))
                          .font(.largeTitle)
                          .fontWeight(.bold)
                    Text("OPEN EXTENSION SETTINGS")
                          .foregroundColor(Color("SECONDARY"))
                          .font(.title3)
                          .fontWeight(.bold)
                }.padding(.bottom,30)
           
                VStack(alignment:.leading,spacing: 20){
                    HStack{
                        Image("ic1step1")
                        HStack{
                            Text("Open the")
                                .foregroundColor(Color("PRIMARY"))
                            Text("Settings App")
                                .foregroundColor(Color("PRIMARY"))
                                .fontWeight(.bold)
                        }
                    }
                    HStack{
                        Image("ic2step1")
                        HStack{
                            Text("Tap")
                                .foregroundColor(Color("PRIMARY"))
                            Text("Safari")
                                .foregroundColor(Color("PRIMARY"))
                                .fontWeight(.bold)
                        }
                    }
                    HStack{
                        Image("ic3step1")
                        HStack{
                            Text("Tap")
                                .foregroundColor(Color("PRIMARY"))
                            Text("Extensions")
                                .foregroundColor(Color("PRIMARY"))
                                .fontWeight(.bold)
                        }
                    }
                    HStack{
                        Image("icApp")
                            .resizable()
                            .frame(maxWidth:30,maxHeight: 30)
                        HStack{
                            Text("Tap")
                                .foregroundColor(Color("PRIMARY"))
                            Text("WebProtectoror")
                                .foregroundColor(Color("PRIMARY"))
                                .fontWeight(.bold)
                        }
                    }
                }.padding(.horizontal,20)
               
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity,alignment: .top)
            .padding(.top,100)
            
        }
        .frame(maxWidth:.infinity,maxHeight: .infinity)
        .background(Color.white).ignoresSafeArea(.all)
    }
}

struct Step2: View {
    var body: some View {
        ZStack{
            VStack{
                Spacer()
                HStack{
                    Image("bottomBg")
                    Spacer()
                }
    
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity)
            VStack(spacing: 20){
                VStack{
                    Text("STEP 2")
                          .foregroundColor(Color("SECONDARY"))
                          .font(.largeTitle)
                          .fontWeight(.bold)
                    Text("ENABLE SAFARI EXTENSION")
                          .foregroundColor(Color("SECONDARY"))
                          .font(.title3)
                          .fontWeight(.bold)
                }.padding(.bottom,30)
                VStack(alignment:.center){
                    VStack(alignment:.leading,spacing: 20){
                        HStack{
                            Image("ic1step2")
                            Text("Enable ")
                                    .foregroundColor(Color("PRIMARY"))
                                    .fontWeight(.bold) + Text("WebProtector")
                                    .foregroundColor(Color("PRIMARY"))
                        }
                        HStack{
                            Image("ic2step2")
                            Text("Tap the permission for ")
                                    .foregroundColor(Color("PRIMARY")) + Text("\"All Websites\"")
                                    .foregroundColor(Color("PRIMARY"))
                                    .fontWeight(.bold)
                        }
                        HStack{
                            Image("ic3step2")
                            Text("Select ")
                                    .foregroundColor(Color("PRIMARY")) + Text("Allow")
                                    .foregroundColor(Color("PRIMARY"))
                                    .fontWeight(.bold)
                        }
                    }.padding(.horizontal,20)
                        .padding(.bottom,40)
                    VStack(alignment:.leading,spacing: 20){
                        Text("Steps above will allow")
                            .foregroundColor(Color("PRIMARY")) + Text(" WebProtector ")
                            .foregroundColor(Color("PRIMARY"))
                            .fontWeight(.bold) + Text("to access all websites.")
                            .foregroundColor(Color("PRIMARY"))
                        Text("You can enable this app on a per-site basis by lauching the extension from Safari.")
                            .foregroundColor(Color("PRIMARY"))
                    }
                }
                .padding(.horizontal,30)
               
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity,alignment: .top)
            .padding(.top,100)
            
        }
        .frame(maxWidth:.infinity,maxHeight: .infinity)
        .background(Color.white).ignoresSafeArea(.all)
    }
}

struct Step3: View {
    @Environment(\.presentationMode) private var presentaionMode: Binding<PresentationMode>
    var body: some View {
        ZStack{
            VStack{
                Spacer()
                HStack{
                    Image("bottomBg")
                    Spacer()
                }
    
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity)
            VStack(spacing: 20){
                VStack{
                    Text("YOU'RE ALL SET")
                          .foregroundColor(Color("SECONDARY"))
                          .font(.largeTitle)
                          .fontWeight(.bold)
                }.padding(.bottom,30)
                Image("icDone")
                Text("Open")
                    .foregroundColor(Color("PRIMARY")) + Text(" Safari ")
                    .foregroundColor(Color("PRIMARY"))
                    .fontWeight(.bold) + Text("and try")
                    .foregroundColor(Color("PRIMARY")) + Text(" WebProtector ")
                    .foregroundColor(Color("PRIMARY")).fontWeight(.bold)
                Button {
                    presentaionMode.wrappedValue.dismiss()
                } label: {
                        ZStack{
                            Image("bgBtn")
                            Text("DONE")
                                .foregroundColor(Color.white)
                                .fontWeight(.bold)
                        }
                }
                
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity,alignment: .top)
            .padding(.top,100)
            
        }
        .frame(maxWidth:.infinity,maxHeight: .infinity)
        .background(Color.white).ignoresSafeArea(.all)
    }
}
