//
//  ContentView.swift
//  WebProtector
//
//  Created by Tuấn Việt on 17/10/2021.
//

import SwiftUI
import StoreKit

struct ContentView: View {
    func rateApp() {
        SKStoreReviewController.requestReview()
    }
    func openContactToUs() {
        let email = "maituanviet.work@gmail.com"
        if let url = URL(string: "mailto:\(email)") {
          if #available(iOS 10.0, *) {
            UIApplication.shared.open(url)
          } else {
            UIApplication.shared.openURL(url)
          }
        }
    }
    
    func shareApp() {
        let myWebsite = NSURL(string:"http://itunes.apple.com/app/id1590726316")
           let activityVC = UIActivityViewController(activityItems: [myWebsite], applicationActivities: nil)
           UIApplication.shared.windows.first?.rootViewController?.present(activityVC, animated: true, completion: nil)
        if UIDevice.current.userInterfaceIdiom == .pad {
            activityVC.popoverPresentationController?.sourceView = UIApplication.shared.windows.first
            activityVC.popoverPresentationController?.sourceRect = CGRect(x: UIScreen.main.bounds.width/2.1, y: UIScreen.main.bounds.height/2.3, width: 200, height: 200)
        }
       }
    var body: some View {
        NavigationView{
        GeometryReader { metrics in
        ZStack{
            VStack{
                Spacer()
                HStack{
                    Image("bottomBgBold")
                    Spacer()
                }
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity)

            VStack{
                Image("icApp")
                Text("WebProtector")
                    .font(.title2)
                    .fontWeight(.semibold)
                    .foregroundColor(Color.black)
                    .padding(.bottom, metrics.size.height * 0.06)
                NavigationLink(destination:Tutorial()){
                    btnView(label: "Tutorial", icImg: "ic1home")
                }
               
                Button{
                    rateApp()
                } label: {
                    btnView(label: "Rate us", icImg: "ic2home")
                }
                Button{
                    openContactToUs()
                } label: {
                    btnView(label: "Contact us", icImg: "ic3home")
                }
                Button{
                    shareApp()
                } label: {
                    btnView(label: "Share", icImg: "ic4home")
                }
           
            }
            .frame(maxWidth:.infinity,maxHeight: .infinity,alignment: .top)
        }//ZStack
        .navigationBarHidden(true)
        }//GeometryReader
        .frame(maxWidth:.infinity,maxHeight: .infinity)
        .background(Color.white).ignoresSafeArea(edges:.bottom)
        }//NavigationView
    }
}

struct btnView: View {
    let label: String!
    let icImg: String!
    var body: some View {
        ZStack{
            Image("bgBtn")
                .resizable()
            VStack{
                HStack{
                    Text(label)
                        .foregroundColor(Color.white)
                    Spacer()
                    Image(icImg)
                }
            }
            .padding(.horizontal,20)
        }
        .frame(maxWidth:200 , maxHeight: 60)
    }
}

